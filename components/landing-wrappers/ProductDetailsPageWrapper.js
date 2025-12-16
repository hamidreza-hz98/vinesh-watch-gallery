/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { getProductDetails } from "@/store/product/product.action";
import { selectProduct } from "@/store/product/product.selector";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slider from "../common/Slider";
import { setFilePath, setFullscreenImages } from "@/lib/media";
import Image from "next/image";
import FullscreenImage from "../common/FullScreenImage";
import { formatPrice, toPersian } from "@/lib/number";
import { InsertEmoticon } from "@mui/icons-material";
import Link from "next/link";
import { productsSliderOptions } from "@/constants/slider-options";
import PrimaryProductCard from "../cards/PrimaryProductCard";
import { updateCart } from "@/store/cart/cart.action";
import { selectCart } from "@/store/cart/cart.selector";
import nookies from "nookies";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { paramifyLink } from "@/lib/request";
import { useSearchParams } from "next/navigation";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} dir="rtl">
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const ProductDetailsPageWrapper = ({ slug }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const notifications = useNotifications();
  const { customer } = nookies.get();
  const cart = useSelector(selectCart);

  const [fullscreenData, setFullscreenData] = useState({
    open: false,
    slides: [],
    initialIndex: 0,
  });
  const [isInCart, setIsInCart] = useState(null);
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const product = useSelector(selectProduct);

  const openFullscreen = (slides, index) => {
    setFullscreenData({ open: true, slides, initialIndex: index });
  };

  useEffect(() => {
    const query = QueryString.stringify({ slug }, { encode: false });

    dispatch(getProductDetails(query));
  }, [dispatch, slug]);

  if (!product) {
    return <Loader />;
  }

  const productDetailsSliderOptions = {
    effect: "slide",
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    navigation: true,
    pagination: false,
    autoplay: true,
    thumbs: true,
    slides: product?.media?.map((image, index) => (
      <Image
        key={index}
        src={setFilePath(image.path)}
        alt={image.title}
        width={0}
        height={0}
        sizes="100vw"
        unoptimized
        crossOrigin="anonymous"
        onClick={() =>
          openFullscreen(setFullscreenImages(product?.media), index)
        }
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
        }}
      />
    )),
  };

  const setProductsSlides = (products) => {
    return products.map((product, index) => (
      <PrimaryProductCard key={index} product={product} />
    ));
  };

  const hasDiscount = product.discount > 0;
  const inStock = product.stock > 0;

  const finalPrice = hasDiscount
    ? product.price - product.discount
    : product.price;

  const handleAddToCart = async () => {
    try {
      const { message } = await dispatch(
        updateCart({
          _id: cart._id,
          options: {
            customerId: customer || null,
            action: "add",
            productId: product._id,
          },
        })
      ).unwrap();

      notifications.show(message || "سبد خرید با موفقیت ویرایش شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleRemoveFromcart = async () => {
    try {
      const { message } = await dispatch(
        updateCart({
          _id: cart._id,
          options: {
            customerId: customer || null,
            action: isInCart.quantity > 1 ? "decrease" : "remove",
            productId: product._id,
          },
        })
      ).unwrap();

      notifications.show(message || "سبد خرید با موفقیت ویرایش شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    const updatedCart = cart?.products?.find(
      (item) => item.product._id === product?._id
    );

    setIsInCart(updatedCart);
  }, [cart, product]);

  return (
    <PageContainer
      breadcrumbs={[
        { name: "گالری ساعت Vinesh", path: "/" },
        { name: "همه محصولات", path: "/products" },
        {
          name: product?.categories?.[0].name,
          path: `/products${paramifyLink(searchParams, "filters", {
            categories: { type: "in", value: [product?.categories?.[0]._id] },
          })}`,
        },
        { name: product?.title },
      ]}
    >
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 5 }}>
          {isMobile && (
            <Typography mt={4} variant="h1">
              {" "}
              {product.title}{" "}
            </Typography>
          )}

          <Slider options={productDetailsSliderOptions} />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          {!isMobile && (
            <Typography mt={4} variant="h1">
              {" "}
              {product.title}{" "}
            </Typography>
          )}

          <Typography variant="body1"> {product.excerpt} </Typography>

          <Divider sx={{ backgroundColor: "primary.dark", mt: 2 }} />

          {inStock ? (
            <>
              {/* 💰 Prices */}
              {hasDiscount ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-around",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Typography>قیمت:</Typography>
                  <Typography color="primary" fontWeight={600} variant="h2">
                    {formatPrice(finalPrice)} تومان
                  </Typography>

                  <Typography
                    variant="h4"
                    color="text.disabled"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {formatPrice(product.price)} تومان
                  </Typography>
                </Box>
              ) : (
                <Typography color="primary" fontWeight={600} variant="h2">
                  <Typography>قیمت:</Typography>
                  {formatPrice(product.price)} تومان
                </Typography>
              )}

              {isInCart ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography variant="h4">تعداد در سبد خرید شما:</Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      sx={{
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        mx: 1,
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                      size="small"
                      onClick={handleAddToCart}
                    >
                      <AddIcon />
                    </IconButton>

                    <Typography mx={1}>
                      {toPersian(isInCart.quantity)}
                    </Typography>

                    <IconButton
                      sx={{
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        mx: 1,
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                      size="small"
                      onClick={handleRemoveFromcart}
                    >
                      {isInCart.quantity === 1 ? (
                        <DeleteOutlineIcon />
                      ) : (
                        <RemoveIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color={inStock ? "primary" : "inherit"}
                  disabled={!inStock}
                  onClick={handleAddToCart}
                  sx={{
                    color: inStock
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.disabled,
                    fontWeight: 700,
                    borderRadius: 2,
                    py: 1,
                    mt: 2,
                  }}
                >
                  {inStock ? " افزودن به سبد" : "نا موجود"}
                </Button>
              )}
            </>
          ) : (
            <Typography mt={2} variant="h4">
              این کالا ناموجود است!
            </Typography>
          )}

          {product?.shortSpecifications &&
            product?.shortSpecifications.length !== 0 && (
              <>
                <Divider sx={{ backgroundColor: "primary.dark", mt: 2 }} />

                <Typography mt={2}>ویژگی ها:</Typography>

                <Grid container spacing={2} mt={2}>
                  {product.shortSpecifications.map((item, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          justifyContent: "space-between",
                          width: "100%",
                          height: "100%",
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.primary.dark}`,
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        <Typography variant="body2"> {item.key}: </Typography>
                        <Typography variant="caption">{item.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

          <Divider sx={{ backgroundColor: "primary.dark", mt: 2 }} />

          <Stack mt={2}>
            <Typography>
              دسته بندی ها:
              {product?.categories?.map((cat, index) => (
                <Link key={index} href={`/products?`}>
                  {" "}
                  {cat.name} {index !== product?.categories.length - 1 && " | "}
                </Link>
              ))}
            </Typography>

            <Typography>
              برند:
              <Link href={`/products?...`}> {product?.brand?.name}</Link>
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Tabs
            value={tabsValue}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="توضیحات" />
            <Tab label="مشخصات" />
          </Tabs>

          <TabPanel value={tabsValue} index={0}>
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          </TabPanel>

          <TabPanel value={tabsValue} index={1}>
            {product?.specifications?.map((spec, index) => (
              <Box
                mt={2}
                // bgcolor={index % 2 === 1 && theme.palette.background.paper}
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="start"
              >
                <Typography width="50%" variant="caption">
                  {" "}
                  {spec.key}{" "}
                </Typography>
                <Typography width="50%" variant="caption">
                  {" "}
                  {spec.value}{" "}
                </Typography>
              </Box>
            ))}
          </TabPanel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          {product?.relatedProducts &&
            product?.relatedProducts.length !== 0 && (
              <>
                <Typography variant="h2" mt={6}>
                  محصولات مرتبط
                </Typography>

                <Slider
                  options={{
                    ...productsSliderOptions,
                    slides: setProductsSlides(product?.relatedProducts),
                  }}
                />
              </>
            )}
        </Grid>
      </Grid>

      {fullscreenData.open && (
        <FullscreenImage
          slides={fullscreenData.slides}
          initialSlide={fullscreenData.initialIndex}
          onClose={() =>
            setFullscreenData({ open: false, slides: [], initialIndex: 0 })
          }
        />
      )}
    </PageContainer>
  );
};

export default ProductDetailsPageWrapper;
