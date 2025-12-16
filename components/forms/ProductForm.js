"use client";

import { defaultProductValues } from "@/constants/default-form-values";
import QueryString from "qs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "../common/Loader";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { formatPrice, toEnglish, toNumber } from "@/lib/number";
import RichTextEditor from "../fields/RichTextEditor";
import TagField from "../fields/TagField";
import MediaPreview from "../common/MediaPreview";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SpecificationsField from "../fields/SpecificationsField";
import MediaPageWrapper from "../wrappers/MediaPageWrapper";
import {
  brandApi,
  categoryApi,
  getAllBrandsApi,
  getAllCategoriesApi,
  getAllProductsApi,
  getAlltagsApi,
  productApi,
  tagApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";

const ProductForm = ({ data, mode = "create", onSubmit }) => {
  const [products, setProducts] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultProductValues(data),
  });

  const initialized = React.useRef(false);

  /* ---------------------------------- */
  /* FETCH DEPENDENCIES */
  /* ---------------------------------- */
  React.useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const query = QueryString.stringify({ page_size: 5000 });

        const [productsRes, categoriesRes, tagsRes, brandsRes] =
          await Promise.all([
            fetchWithAuth(getAllProductsApi(query)),
            fetchWithAuth(getAllCategoriesApi(query)),
            fetchWithAuth(getAlltagsApi(query)),
            fetchWithAuth(getAllBrandsApi(query)),
          ]);

        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
        setTags(tagsRes.data.tags || []);
        setBrands(brandsRes.data.brands || []);
      } catch (error) {
        console.error("Failed to load product dependencies", error);
      }
    };

    fetchDependencies();
  }, []);

  /* ---------------------------------- */
  /* INIT FORM RELATIONS (EDIT MODE) */
  /* ---------------------------------- */
  React.useEffect(() => {
    if (
      !categories.length ||
      !products.length ||
      !tags.length ||
      !brands.length ||
      !data?._id ||
      initialized.current
    )
      return;

    initialized.current = true;

    if (data.relatedProducts)
      setValue(
        "relatedProducts",
        data.relatedProducts.map((t) => (t?._id ? t._id : t))
      );

    if (data.tags)
      setValue(
        "tags",
        data.tags.map((t) => (t?._id ? t._id : t))
      );

    if (data.brands)
      setValue(
        "brands",
        data.brands.map((t) => (t?._id ? t._id : t))
      );

    if (data.categories)
      setValue(
        "categories",
        data.categories.map((t) => (t?._id ? t._id : t))
      );
  }, [categories, products, tags, brands, data, setValue]);

  /* ---------------------------------- */
  /* RESET + MEDIA STATE */
  /* ---------------------------------- */
  React.useEffect(() => {
    setSelectedMediaObjects({
      media: data?.media,
      "seo.ogImage": data?.seo?.ogImage,
      "seo.twitterImage": data?.seo?.twitterImage,
    });

    reset(defaultProductValues(data));
  }, [data, reset]);

  /* ---------------------------------- */
  /* SUBMIT */
  /* ---------------------------------- */
  const handleFormSubmit = async (formData) => {
    onSubmit && onSubmit(formData);
  };

  /* ---------------------------------- */
  /* MEDIA DRAWER */
  /* ---------------------------------- */
  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    const ids = drawerMultiple ? media.map((m) => m?._id) : media[0]?._id;
    setValue(activeField, ids);

    setSelectedMediaObjects((prev) => ({
      ...prev,
      [activeField]: drawerMultiple ? media : media[0] || null,
    }));

    setDrawerOpen(false);
  };

  if (
    (mode === "edit" && !data) ||
    !categories.length ||
    !products.length ||
    !tags.length ||
    !brands.length
  ) {
    return <Loader />;
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="نام محصول"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Slug" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  multiline
                  label="توضیح خلاصه"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="قیمت"
                  type="text"
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const numericValue =
                      parseInt(
                        toEnglish(e.target.value).replace(/[^\d]/g, ""),
                        10
                      ) || 0;
                    setValue("price", numericValue);
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  size="small"
                  {...field}
                  fullWidth
                  multiline
                  label="تخفیف"
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const numericValue =
                      parseInt(
                        toEnglish(e.target.value).replace(/[^\d]/g, ""),
                        10
                      ) || 0;
                    setValue("discount", numericValue);
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  size="small"
                  {...field}
                  fullWidth
                  multiline
                  label="تعداد در انبار"
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const numericValue =
                      parseInt(
                        toEnglish(e.target.value).replace(/[^\d]/g, ""),
                        10
                      ) || 0;
                    setValue("stock", numericValue);
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  text={field.value}
                  label="توضیحات تکمیلی"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => {
                const selectedCategories = (field.value || []).map((item) =>
                  categories?.find((c) => c._id === (item?._id || item))
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={categories || []}
                    getOptionLabel={(option) => option.name}
                    value={selectedCategories}
                    noOptionsText="دسته بندی ای یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="دسته بندی ها" />
                    )}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  size="small"
                  fullWidth
                  options={brands || []}
                  getOptionLabel={(option) => option?.name || ""}
                  value={field.value || null}
                  noOptionsText="برندی یافت نشد!"
                  onChange={(e, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="برند" />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="relatedProducts"
              control={control}
              render={({ field }) => {
                const selectedProducts = (field.value || []).map((item) =>
                  products?.find((c) => c._id === (item?._id || item))
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={products || []}
                    getOptionLabel={(option) => option.title}
                    value={selectedProducts}
                    noOptionsText="محصولی یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="محصولات مرتبط" />
                    )}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TagField
                  initialTags={tags}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="media"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>عکس های محصول</Typography>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("media", "image", true)}
                  >
                    انتخاب
                  </Button>

                  <Box display="flex" gap={2}>
                    {selectedMediaObjects.media &&
                      selectedMediaObjects.media.length !== 0 &&
                      selectedMediaObjects.media.map((item, index) => (
                        <MediaPreview key={index} file={item} />
                      ))}
                  </Box>
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="shortSpecifications"
              control={control}
              render={({ field }) => (
                <SpecificationsField
                  value={field.value}
                  onChange={field.onChange}
                  label="مشخصات کوتاه"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="specifications"
              control={control}
              render={({ field }) => (
                <SpecificationsField
                  value={field.value}
                  onChange={field.onChange}
                  label="مشخصات کامل"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={2}>
            <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

            <Typography mt={2} variant="h4">
              تنظیمات سئو
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.title"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="عنوان سئو"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Controller
              name="seo.description"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات سئو"
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.keywords"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="کلمات کلیدی (با کاما جدا کنید)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogTitle"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="OG Title" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="OG Description"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>OG Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.ogImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.ogImage`] && (
                    <MediaPreview file={selectedMediaObjects[`seo.ogImage`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="تیتر توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>Twitter Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.twitterImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.twitterImage`] && (
                    <MediaPreview
                      file={selectedMediaObjects[`seo.twitterImage`]}
                    />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.canonical"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="لینک کنونیکال"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.robots"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Robots" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.additionalMetaTags"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="متا تگ های اضافی"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش محصول" : "ایجاد محصول"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          sx: {
            zIndex: (theme) => theme.zIndex.modal + 1000,
          },
        }}
      >
        <Box>
          <MediaPageWrapper
            onSelect={handleSelect}
            isOnForm
            type={drawerType}
            multiple={drawerMultiple}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default ProductForm;
