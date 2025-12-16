"use client"

import React from "react";
import { Pagination, Select, MenuItem, FormControl, InputLabel, PaginationItem } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { toPersian } from "@/lib/number";

export default function CustomPagination({ page, page_size, total }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / page_size);

  const updateParams = (newPage, newPageSize) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage) params.set("page", newPage);
    if (newPageSize) params.set("page_size", newPageSize);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (_, value) => {
    updateParams(value, page_size);
  };


  return (
      <Pagination
        page={page}
        count={totalPages}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem {...item} page={toPersian(item.page)} />
        )}
        variant="outlined"
        shape="rounded"
      />
  );
}
