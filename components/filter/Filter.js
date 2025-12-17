/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Button,
  useTheme,
  TextField,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/number";
import { useLandingData } from "@/providers/LandingDataProvider";
import LandingThemeProvider from "@/theme/providers/LandingThemeProvider";

const SidebarFilter = ({ onChange, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
  const searchParams = useSearchParams();

  const { categories, brands } = useLandingData();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Initialize filters from URL
  useEffect(() => {
    const filtersParam = searchParams.get("filters");
    if (filtersParam) {
      try {
        const parsed = JSON.parse(filtersParam);
        setSelectedCategories(parsed.categories?.value || []);
        setSelectedBrands(parsed.brand?.value || []);
        if (parsed.price) setPriceRange([parsed.price.from, parsed.price.to]);
        setInStockOnly(!!parsed.stock);
        setDiscountOnly(!!parsed.discount);
      } catch (e) {}
    }
  }, [searchParams]);

  useEffect(() => {
    const existingSearch = searchParams.get("search") || "";
    setSearchValue(existingSearch);
  }, [searchParams]);

  /** 🔧 Convert frontend state → backend filter structure */
  const pushFiltersToUrl = (stateFilters) => {
    const backendFilters = {};

    if (stateFilters.categories?.length)
      backendFilters.categories = {
        type: "in",
        value: stateFilters.categories,
      };

    if (stateFilters.brands?.length)
      backendFilters.brand = { type: "in", value: stateFilters.brands };

    if (stateFilters.price)
      backendFilters.price = {
        type: "range",
        from: stateFilters.price[0],
        to: stateFilters.price[1],
      };

    if (stateFilters.inStock) backendFilters.stock = { type: "gt", value: 0 };

    if (stateFilters.discount)
      backendFilters.discount = { type: "gt", value: 0 };

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("filters", JSON.stringify(backendFilters));
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 3) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("search", value);
      router.push(`?${newParams.toString()}`);
    }
  };

  // --- category ---
  const toggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      pushFiltersToUrl({
        categories: updated,
        brands: selectedBrands,
        price: priceRange,
        inStock: inStockOnly,
        discount: discountOnly,
      });
      return updated;
    });

    onChange();
  };

  // --- brand (multi-selection now) ---
  const toggleBrand = (id) => {
    setSelectedBrands((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id];
      pushFiltersToUrl({
        categories: selectedCategories,
        brands: updated,
        price: priceRange,
        inStock: inStockOnly,
        discount: discountOnly,
      });
      return updated;
    });

    onChange();
  };

  // --- price ---
  const handlePriceChangeCommitted = (e, newValue) => {
    setPriceRange(newValue);
    pushFiltersToUrl({
      categories: selectedCategories,
      brands: selectedBrands,
      price: newValue,
      inStock: inStockOnly,
      discount: discountOnly,
    });

    onChange();
  };

  // --- inStock ---
  const toggleInStock = () => {
    const updated = !inStockOnly;
    setInStockOnly(updated);
    pushFiltersToUrl({
      categories: selectedCategories,
      brands: selectedBrands,
      price: priceRange,
      inStock: updated,
      discount: discountOnly,
    });

    onChange();
  };

  // --- discount ---
  const toggleDiscount = () => {
    const updated = !discountOnly;
    setDiscountOnly(updated);
    pushFiltersToUrl({
      categories: selectedCategories,
      brands: selectedBrands,
      price: priceRange,
      inStock: inStockOnly,
      discount: updated,
    });

    onChange();
  };

  // --- reset ---
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000000000]);
    setInStockOnly(false);
    setDiscountOnly(false);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("filters");
    newSearchParams.delete("search");
    router.replace(`?${newSearchParams.toString()}`);
    setSearchValue("");

    onChange();
  };

  return (
        <LandingThemeProvider>
    <Box
      sx={{
        position: "sticky",
        top: 80,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      {isMobile && (
        <Box>
          <Button variant="outlined" color="error" onClick={onClose} fullWidth>
            بستن
          </Button>
        </Box>
      )}

      <Box>
        <Button
          variant="outlined"
          color="inherit"
          onClick={resetFilters}
          fullWidth
        >
          حذف فیلترها
        </Button>
      </Box>

      <TextField
        placeholder="جستجو..."
        fullWidth
        size="small"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchQuery}
      />

      <Box>
        <Typography fontWeight={700} mb={1}>
          دسته بندی
        </Typography>

        <Autocomplete
          multiple
          options={categories || []}
          getOptionLabel={(option) => option.name}
          value={
            categories?.filter((c) => selectedCategories.includes(c._id)) || []
          }
          onChange={(e, newValue) => {
              const updated = newValue.map((v) => v._id);
    setSelectedCategories(updated);

    pushFiltersToUrl({
      categories: updated,
      brands: selectedBrands,
      price: priceRange,
      inStock: inStockOnly,
      discount: discountOnly,
    });

    onChange();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="انتخاب دسته بندی"
            />
          )}
        />
      </Box>

      <Box>
        <Typography fontWeight={700} mb={1}>
          برند
        </Typography>

        <Autocomplete
          multiple
          options={brands || []}
          getOptionLabel={(option) => option.name}
          value={brands?.filter((b) => selectedBrands.includes(b._id)) || []}
          onChange={(e, newValue) => {
            const updated = newValue.map((v) => v._id);
    setSelectedBrands(updated);
           
           pushFiltersToUrl({
      categories: selectedCategories,
      brands: updated,
      price: priceRange,
      inStock: inStockOnly,
      discount: discountOnly,
    });

    onChange();
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" placeholder="انتخاب برند" />
          )}
        />
      </Box>

      {/* Price */}
      <Box>
        <Typography fontWeight={700} mb={1}>
          محدوده قیمت
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          onChangeCommitted={handlePriceChangeCommitted}
          step={100000}
          valueLabelDisplay="auto"
          size="small"
          min={0}
          max={100000000}
          valueLabelFormat={(value) => formatPrice(value)}
          sx={{
            "& .MuiSlider-thumb": {
              transform: "translate(50%, -50%)",
            },
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={0}>
          <Typography variant="caption">
            {formatPrice(priceRange[0])} تومان
          </Typography>
          <Typography variant="caption">
            {formatPrice(priceRange[1])} تومان
          </Typography>
        </Box>
      </Box>

      {/* In Stock */}
      <Box>
        <FormControlLabel
          sx={{ mr: 0 }}
          control={
            <Checkbox
              size="small"
              checked={inStockOnly}
              onChange={toggleInStock}
            />
          }
          label="فقط کالاهای موجود"
        />
      </Box>

      {/* Discount */}
      <Box>
        <FormControlLabel
          sx={{ mr: 0 }}
          control={
            <Checkbox
              size="small"
              checked={discountOnly}
              onChange={toggleDiscount}
            />
          }
          label="فقط کالاهای دارای تخفیف"
        />
      </Box>
    </Box>
        </LandingThemeProvider>

  );
};

export default SidebarFilter;
