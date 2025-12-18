"use client";

import React, { useEffect, useState } from "react";
import PageContainer from "../common/PageContainer";
import Loader from "../common/Loader";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Sort from "../filter/Sort";
import {
  filterProductsOptions,
  sortProductOptions,
} from "@/constants/filter-data";
import PrimaryProductCard from "../cards/PrimaryProductCard";
import Filter from "../filter/Filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CustomPagination from "../filter/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import routes from "@/constants/landing.routes";
import { useLandingData } from "@/providers/LandingDataProvider";
import { getAllProducts } from "@/app/actions/product";

const ProductsOverviewPageWrapper = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { brands, categories } = useLandingData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const filters = searchParams.get("filters") || {};
  const sort = searchParams.get("sort") || [
    { field: "createdAt", order: "desc" },
  ];
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 12;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const queries = { filters, sort, page, page_size, search };

        const {data} = await getAllProducts(queries);

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!categories || !brands || !products) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <Grid container spacing={4}>
        {/* ✅ LEFT COLUMN — FILTER (only visible on desktop) */}
        {!isMobile && (
          <Grid size={{ xs: 12, sm: 3 }}>
            <Filter options={filterProductsOptions} />
          </Grid>
        )}

        {/* ✅ MAIN PRODUCTS AREA */}
        <Grid size={{ xs: 12, sm: 9 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isMobile ? "space-between" : "flex-end",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                {isMobile ? (
                  <>
                    {/* Filter Icon */}
                    <IconButton onClick={() => setFilterOpen(true)}>
                      <FilterListIcon />

                      <Typography mr={1} variant="subtitle1">
                        فیلتر
                      </Typography>
                    </IconButton>

                    {/* Sort Icon */}
                    <IconButton onClick={() => setSortOpen(true)}>
                      <SortIcon />

                      <Typography mr={1} variant="subtitle1">
                        مرتب سازی
                      </Typography>
                    </IconButton>
                  </>
                ) : (
                  <Sort options={sortProductOptions} />
                )}
              </Box>
            </Grid>

            {/* ✅ Product Grid */}
            {products &&
            products?.products &&
            products?.products.length !== 0 ? (
              products?.products?.map((product, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <PrimaryProductCard product={product} />
                </Grid>
              ))
            ) : (
              <NoDataAvailable
                clickText="مشاهده ی همه ی محصولات"
                text="محصولی با این مشخصات پیدا نشد!"
                onClick={() => router.replace(`${routes.products.link}`)}
              />
            )}

            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              size={{ xs: 12 }}
            >
              <CustomPagination
                page={page}
                page_size={page_size}
                total={products?.total}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ✅ FILTER DRAWER (for mobile) */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{
          sx: { width: "80vw", maxWidth: 360, p: 2 },
        }}
      >
        <Filter
          onChange={() => setFilterOpen(false)}
          options={filterProductsOptions}
          onClose={() => setFilterOpen(false)}
        />
      </Drawer>

      {/* ✅ SORT SELECT (for mobile) */}
      {isMobile && (
        <Drawer
          anchor="bottom"
          open={sortOpen}
          onClose={() => setSortOpen(false)}
          PaperProps={{
            sx: { p: 2 },
          }}
        >
          <Box>
            <Select
              fullWidth
              open
              defaultValue=""
              displayEmpty
              onChange={(e) => {
                const selected = sortProductOptions.find(
                  (opt) => opt.field === e.target.value.field
                );

                const newSearchParams = new URLSearchParams(
                  searchParams.toString()
                );
                newSearchParams.set(
                  "sort",
                  JSON.stringify([
                    { field: selected.field, order: selected.order },
                  ])
                );

                router.replace(`?${newSearchParams.toString()}`);

                // you can trigger the same sorting logic from <Sort />
                setSortOpen(false);
              }}
            >
              <MenuItem disabled value="">
                انتخاب مرتب‌سازی
              </MenuItem>

              {sortProductOptions.map((opt, i) => (
                <MenuItem key={i} value={opt}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Drawer>
      )}
    </PageContainer>
  );
};

export default ProductsOverviewPageWrapper;
