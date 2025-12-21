"use client";

import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import HeroSlider from "../common/HeroSlider";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { paramifyLink } from "@/lib/request";
import PrimaryProductCard from "../cards/PrimaryProductCard";
import { productsSliderOptions } from "@/constants/slider-options";
import Slider from "../common/Slider";
import { useSearchParams } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLandingData } from "@/providers/LandingDataProvider";
import { getAllProducts } from "@/app/actions/product";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import LandingPageContainer from "../common/LandingPageContainer";

const HomepageWrapper = () => {
  const { categories, brands, settings } = useLandingData();
  const searchParams = useSearchParams();

  const notifications = useNotifications();
  const auth = searchParams.get("auth");

  const theme = useTheme();

  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [productsWithDiscount, setProductsWithDiscount] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mostSoldResponse = await getAllProducts({
          page_size: 10,
          sort: [{ field: "soldNumber", order: "desc" }],
          filters: { stock: { type: "gt", value: 0 } },
        });

        setMostSoldProducts(mostSoldResponse.data.products);

        const discountResponse = await getAllProducts({
          page_size: 10,
          filters: {
            discount: { type: "gt", value: 0 },
            stock: { type: "gt", value: 0 },
          },
        });

        setProductsWithDiscount(discountResponse.data.products);
      } catch (error) {
        console.error(error.message || "");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (auth && auth === "required") {
      notifications.show("لطفا مجددا وارد حساب کاربری شوید.", {
        severity: "info",
        autoHideDuration: 7000,
      });
    }
  }, [auth]);

  if (
    !settings ||
    !categories ||
    !brands ||
    mostSoldProducts.length === 0 ||
    productsWithDiscount.length === 0
  ) {
    return <Loader />;
  }

  const setProductsSlides = (products) => {
    return products.map((product, index) => (
      <PrimaryProductCard key={index} product={product} />
    ));
  };

  return (
    <LandingPageContainer>
      <HeroSlider slides={settings?.general?.homepageSlider} />

      <Grid container mt={6} spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h1">دسته بندی ها</Typography>
        </Grid>

        {categories.map((cat, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
            <Link
              href={`/products${paramifyLink(searchParams, "filters", {
                categories: { type: "in", value: [cat._id] },
              })}`}
              style={{
                display: "block",
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1", // Ensures perfect square
                borderRadius: "50%", // Circle container
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Image
                  src={cat.image.path}
                  alt={cat.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: 600,
                    textAlign: "center",
                    p: 1,
                    backdropFilter: "blur(8px)",
                    borderRadius: "12px",
                    minWidth: "60%",
                    zIndex: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="subtitle1">{cat.name}</Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Grid container mt={6} spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h1">برند ها</Typography>
        </Grid>

        {brands.map((item, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
            <Box
              component={Link}
              href={`/products${paramifyLink(searchParams, "filters", {
                brand: { type: "eq", value: item._id },
              })}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                backgroundColor: "background.paper",
                p: 2,
              }}
            >
              <Image
                src={item.logo.path}
                alt={item.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "contain",
                }}
              />

              <Typography>{item.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {mostSoldProducts && mostSoldProducts.length !== 0 && (
        <>
          <Box
            mt={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">پرفروش ترین محصولات</Typography>

            <Button
              variant="text"
              LinkComponent={Link}
              href={`/products${paramifyLink(searchParams, "sort", [
                { field: "createdAt", order: "desc" },
              ])}`}
              style={{ color: theme.palette.primary.main }}
            >
              مشاهده همه
              <ChevronLeftIcon />
            </Button>
          </Box>

          <Slider
            options={{
              ...productsSliderOptions,
              slides: setProductsSlides(mostSoldProducts),
            }}
          />
        </>
      )}

      {productsWithDiscount && productsWithDiscount.length !== 0 && (
        <>
          <Box
            mt={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">تخفیف ها</Typography>

            <Button
              variant="text"
              LinkComponent={Link}
              href={`/products${paramifyLink(searchParams, "filters", {
                discount: { type: "gt", value: 0 },
              })}`}
              style={{ color: theme.palette.primary.main }}
            >
              مشاهده همه
              <ChevronLeftIcon />
            </Button>
          </Box>

          <Slider
            options={{
              ...productsSliderOptions,
              slides: setProductsSlides(productsWithDiscount),
            }}
          />
        </>
      )}
    </LandingPageContainer>
  );
};

export default HomepageWrapper;
