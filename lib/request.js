export const setRequestBody = ({
  filters = {},
  sort = [{ field: "createdAt", order: "desc" }],
  page = 1,
  page_size = 12,
} = {}) => {
  return {
    filter: filters,
    sort,
    page,
    page_size,
  };
};

/**
 * Converts a query object into a backend-friendly query string
 * Compatible with your GET /categories API
 */
const buildQueryString = (obj, prefix = "") => {
  const pairs = [];

  for (const key in obj) {
    if (!Object.hasOwn(obj, key) || obj[key] == null) continue;

    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === "object" && !Array.isArray(value)) {
      pairs.push(buildQueryString(value, prefixedKey));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object") {
          pairs.push(buildQueryString(v, `${prefixedKey}[${i}]`));
        } else {
          pairs.push(
            `${encodeURIComponent(prefixedKey)}[]=${encodeURIComponent(v)}`
          );
        }
      });
    } else {
      pairs.push(
        `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
      );
    }
  }

  return pairs.join("&");
};

/**
 * Build query string for backend from Grid/any input
 * @param {Object} param0
 * @param {Object} param0.filters - structured filters
 * @param {Array} param0.sort - array of { field, order }
 * @param {number} param0.page
 * @param {number} param0.page_size
 */
export const setRequestQuery = ({
  filters = {},
  sort = [{ field: "createdAt", order: "desc" }],
  page = 1,
  page_size = 12,
} = {}) => {
  // backend expects: filter[...], sort=JSON, page, page_size
  const queryObject = {
    filter: filters,
    sort: JSON.stringify(sort),
    page,
    page_size,
  };

  return buildQueryString(queryObject);
};


/**
 * Transform MUI DataGrid query model to a backend-friendly query object.
 * @param {Object} params
 * @param {Object} params.paginationModel - { page, pageSize }
 * @param {Array}  params.sortModel - [ { field, sort } ]
 * @param {Object} params.filterModel - { items: [], quickFilterValues: [] }
 * @returns {Object} backend-ready query object
 */
export function transformGridQuery(params = {}) {
  const {
    paginationModel = {},
    sortModel = [],
    filterModel = {},
  } = params;

  // ------------------------------
  // PAGE + PAGE SIZE
  // ------------------------------
  const page = (paginationModel.page ?? 0) + 1;
  const page_size = paginationModel.pageSize ?? 10;

  // ------------------------------
  // SORT → [{ field, order }]
  // ------------------------------
  const sort = sortModel
    .filter((s) => s.field && s.sort)
    .map(({ field, sort }) => ({
      field,
      order: sort === "asc" ? "asc" : "desc",
    }));

  // ------------------------------
  // FILTERS → backend structure
  //
  // Example:
  // { price: { type: "eq", value: 100 } }
  // ------------------------------
  const filters = {};

  if (Array.isArray(filterModel.items)) {
    for (const f of filterModel.items) {
      const { field, value, operator } = f;
      if (!field || value == null || value === "") continue;

      switch (operator) {
        case "equals":
          filters[field] = { type: "eq", value };
          break;

        case "contains":
          filters[field] = { type: "regex", value };
          break;

        case "startsWith":
          filters[field] = { type: "regex", value: `^${value}` };
          break;

        case "endsWith":
          filters[field] = { type: "regex", value: `${value}$` };
          break;

        case "isEmpty":
          filters[field] = { type: "eq", value: "" };
          break;

        case "isNotEmpty":
          filters[field] = { type: "regex", value: ".+" };
          break;

        default:
          // fallback
          filters[field] = { type: "eq", value };
      }
    }
  }

  // ------------------------------
  // QUICK SEARCH → text only
  // ------------------------------
  const search = Array.isArray(filterModel.quickFilterValues)
    ? filterModel.quickFilterValues.join(" ").trim()
    : "";

  // ------------------------------
  // FINAL QUERY OBJECT
  // ------------------------------
  return {
    filters,
    sort: sort.length ? sort : [{ field: "createdAt", order: "desc" }],
    page,
    page_size,
    search,
  };
}


/**
 * purifyData
 *
 * Replaces full media/tag objects in the given fields with their _id(s) for backend.
 *
 * Supports nested arrays, e.g. "translations.banners".
 *
 * @param {Object} data - The full object to purify
 * @param {Array<string>} fields - Array of fields to purify. Can support nested paths using dot notation
 * @returns {Object} purified data, ready for API
 */
export function purifyData(data, fields = []) {
  if(!fields || fields.length === 0) return data
  const cloned = JSON.parse(JSON.stringify(data));

  const purifyAtPath = (obj, keys) => {
    if (!obj) return;

    const key = keys[0];

    if (keys.length === 1) {
      // Last key → purify
      if (!obj[key]) return;

      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item) =>
          item && typeof item === "object" && "_id" in item ? item._id : item
        );
      } else if (typeof obj[key] === "object" && "_id" in obj[key]) {
        obj[key] = obj[key]._id;
      }
    } else {
      // Intermediate key → traverse
      const next = obj[key];

      if (Array.isArray(next)) {
        // Traverse each object in array
        next.forEach((child) => purifyAtPath(child, keys.slice(1)));
      } else if (typeof next === "object") {
        purifyAtPath(next, keys.slice(1));
      }
    }
  };

  fields.forEach((path) => {
    const keys = path.split(".");
    purifyAtPath(cloned, keys);
  });

  return cloned;
}

export const paramifyLink = (searchParams, section = "filters"  ,query) => {
  // Clone existing URLSearchParams
  const newSearchParams = new URLSearchParams(searchParams.toString());

  // Overwrite filters param with your provided query
  newSearchParams.set(section, JSON.stringify(query));

  

  // Return the full search string (same behavior as router.replace)
  return `?${newSearchParams.toString()}`;
};
