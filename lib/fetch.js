import { parseCookies } from "nookies";

/**
 * fetchWithAuth
 * @param {string} url - API endpoint
 * @param {object} options - { method, body, query, headers }
 */
export async function fetchWithAuth(url, options = {}) {
  
  const cookies = parseCookies();
  const token = cookies.token;
  
  // Handle query parameters
  if (options.query && typeof options.query === "object") {
    const queryString = new URLSearchParams(options.query).toString();
    url += url.includes("?") ? `&${queryString}` : `?${queryString}`;
  }

  // Detect FormData
  const isFormData = options.body instanceof FormData;

  // Prepare headers
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
  };

  // Prepare fetch config
  const config = {
    method: options.method || "GET",
    headers,
  };
  
  // Add body
  if (options.body != null) {
    if (isFormData && config.method !== "GET" && config.method !== "HEAD") {
      config.body = options.body;
    } else if (!isFormData && config.method !== "GET" && config.method !== "HEAD") {
      config.body = JSON.stringify(options.body);
    }
  }

  try {
    const res = await fetch(url, config);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data?.message || "Request failed");
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}