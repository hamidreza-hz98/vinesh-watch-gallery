"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchResultCard from "../cards/SearchResultCard";
import CloseIcon from "@mui/icons-material/Close";
import { setRequestQuery } from "@/lib/request";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/fetch";
import { getAllCategoriesApi, getAllProductsApi } from "@/constants/api.routes";

export default function SearchDialog({ open, onClose }) {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length > 3) {
      const fetchData = async () => {
        try {
          setLoading(true)

          const reqQuery = setRequestQuery({ search: query, page_size: 3 });
          
          const catResult = await fetchWithAuth(getAllCategoriesApi(reqQuery));
          
          const prodResult = await fetchWithAuth(getAllProductsApi(reqQuery));
          
          setCategories(catResult.categories);
          setProducts(prodResult.products);
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false)

        }
      };

      fetchData();
    }
  }, [query]);

  const noResults =
    loading &&
    query.length > 3 &&
    categories?.length === 0 &&
    products?.length === 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: isMobile ? 1 : 4 }}
      >
        <Typography> جستجو </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: isMobile ? 1 : 4, pb: 0 }}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          size={ isMobile ? "small" : "medium" }
          placeholder="جستجوی محصول یا دسته بندی..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 3 }}
        />

        {noResults && (
          <Typography color="text.secondary" textAlign="center" py={4}>
            موردی پیدا نشد!
          </Typography>
        )}

        {!noResults && (
          <>
            {/* Categories */}
            {categories.length > 0 && (
              <Box mb={4}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">دسته بندی ها</Typography>

                  <Button
                    LinkComponent={Link}
                    href={`/products?search=${query}`}
                    onClick={onClose}
                    variant="text"
                    >
                    مشاهده همه
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {categories.map((cat, i) => (
                    <Grid size={{ xs: 12, sm: "auto" }} key={i}>
                      <SearchResultCard entity={cat} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Products */}
            {products.length > 0 && (
              <Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">محصولات</Typography>

                  <Button
                    LinkComponent={Link}
                    href={`/products?search=${query}`}
                    onClick={onClose}
                    variant="text"
                  >
                    مشاهده همه
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {products.map((prod, i) => (
                    <Grid size={{ xs: 12, sm: "auto" }} key={i}>
                      <SearchResultCard entity={prod} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
