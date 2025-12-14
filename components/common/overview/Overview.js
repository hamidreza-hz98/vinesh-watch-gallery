"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDialogs } from "@/hooks/useDialogs/useDialogs";
import PageContainer from "../PageContainer";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { muiLocaleText } from "@/constants/general";

const INITIAL_PAGE_SIZE = 10;

export default function Overview({
  title,
  breadcrumbs,
  columns,
  getMany,
  deleteOne,
  createPath = "create",
  formMode = "page",
  FormComponent,
  rowActions = [],
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState("create");
  const [selectedRow, setSelectedRow] = React.useState(null);

  const [paginationModel, setPaginationModel] = React.useState({
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : INITIAL_PAGE_SIZE,
  });

  const [filterModel, setFilterModel] = React.useState(
    searchParams.get("filter")
      ? JSON.parse(searchParams.get("filter") ?? "")
      : { items: [] }
  );

  const [sortModel, setSortModel] = React.useState(
    searchParams.get("sort") ? JSON.parse(searchParams.get("sort") ?? "") : []
  );

  const [rowsState, setRowsState] = React.useState({
    rows: [],
    rowCount: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handlePaginationModelChange = React.useCallback(
    (model) => {
      setPaginationModel(model);

      searchParams.set("page", String(model.page));
      searchParams.set("pageSize", String(model.pageSize));

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const handleFilterModelChange = React.useCallback(
    (model) => {
      setFilterModel(model);

      if (
        model.items.length > 0 ||
        (model.quickFilterValues && model.quickFilterValues.length > 0)
      ) {
        searchParams.set("filter", JSON.stringify(model));
      } else {
        searchParams.delete("filter");
      }

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const handleSortModelChange = React.useCallback(
    (model) => {
      setSortModel(model);

      if (model.length > 0) {
        searchParams.set("sort", JSON.stringify(model));
      } else {
        searchParams.delete("sort");
      }

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const listData = await getMany({
        paginationModel,
        sortModel,
        filterModel,
      });

      setRowsState({
        rows: listData.items,
        rowCount: listData.rowCount,
      });
    } catch (listDataError) {
      setError(listDataError);
    }

    setIsLoading(false);
  }, [getMany, paginationModel, sortModel, filterModel]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = React.useCallback(() => {
    if (!isLoading) {
      loadData();
    }
  }, [isLoading, loadData]);

  const handleRowClick = React.useCallback(
    ({ row }) => {
        if (rowActions.includes("details") && formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else if (rowActions.includes("details")) {
        return router.push(`${pathname}/${row._id}`);
      } else if (formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else {
        router.push(`${pathname}/${createPath}?_id=${row._id}`);
      }
    },
    [rowActions, formMode, router, pathname, createPath]
  );

  const handleCreateClick = React.useCallback(() => {
    if (formMode === "drawer") {
      setDrawerMode("create");
      setSelectedRow(null);
      setDrawerOpen(true);
    } else {
      router.push(`${pathname}/${createPath}`);
    }
  }, [formMode, router, pathname, createPath]);

  // Handle edit
  const handleRowEdit = React.useCallback(
    (row) => () => {
      if (rowActions.includes("details") && formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else if (rowActions.includes("details")) {
        return router.push(`${pathname}/${row._id}`);
      } else if (formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else {
        router.push(`${pathname}/${createPath}?_id=${row._id}`);
      }
    },
    [rowActions, formMode, router, pathname, createPath]
  );

  const handleRowDelete = React.useCallback(
    (row) => async () => {
      const confirmed = await dialogs.confirm(
        `آیا از حذف این مورد اطمینان دارید؟`,
        {
          title: `حذف`,
          severity: "error",
          okText: "پاک کردن",
          cancelText: "لغو",
        }
      );

      if (confirmed) {
        setIsLoading(true);
        try {
          const { message } = await deleteOne(row._id);

          notifications.show(message || "آیتم با موفقیت حذف شد.", {
            severity: "success",
            autoHideDuration: 3000,
          });
          loadData();
        } catch (deleteError) {
          notifications.show(`مشکلی پیش آمد. دلیل: ${deleteError}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
        setIsLoading(false);
      }
    },
    [dialogs, notifications, loadData, deleteOne]
  );

  const handleRowDetails = React.useCallback(
    (row) => {
       if (rowActions.includes("details") && formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else if (rowActions.includes("details")) {
        return router.push(`${pathname}/${row._id}`);
      } else if (formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else {
        // do some thing else
      }
    },
    [formMode]
  );

  const handleSuccess = React.useCallback(
    (message) => {
      notifications.show(message || "عملیات با موفقیت انجام شد.", {
        severity: "success",
        autoHideDuration: 3000,
      });

      // eslint-disable-next-line react-hooks/immutability
      handleDrawerClose();
      loadData();
    },
    [loadData, notifications]
  );

  const handleError = React.useCallback(
    (message) => {
      notifications.show(message || "مشکلی پیش آمد.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    },
    [notifications]
  );

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  const actions = React.useMemo(
    () => ({
      edit: (row) => (
        <GridActionsCellItem
          key="edit-item"
          icon={<ModeEditOutlineOutlinedIcon />}
          label="Edit"
          onClick={handleRowEdit(row)}
        />
      ),
      delete: (row) => (
        <GridActionsCellItem
          key="delete-item"
          icon={<DeleteOutlinedIcon />}
          label="Delete"
          onClick={handleRowDelete(row)}
        />
      ),
      details: (row) => (
        <GridActionsCellItem
          key="details-item"
          icon={<RemoveRedEyeOutlinedIcon />}
          label="Details"
          onClick={handleRowEdit(row)}
        />
      ),
    }),
    [handleRowEdit, handleRowDelete, handleRowDetails]
  );

  const dynamicColumns = React.useMemo(() => {
    const actionsColumn = {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "right",
      minWidth: 100,
      getActions: ({ row }) => {
        if (rowActions && rowActions.length > 0) {
          return rowActions
            .map((action) => {
              if (typeof action === "string" && actions[action])
                return actions[action](row);
              if (typeof action === "function") return action(row);
              return null;
            })
            .filter(Boolean);
        }
        return [actions.edit(row), actions.delete(row)];
      },
    };

    const hasActions = columns.some((col) => col.field === "actions");
    return hasActions ? columns : [...columns, actionsColumn];
  }, [columns, rowActions, actions]);

  return (
    <PageContainer
      title={title}
      breadcrumbs={breadcrumbs || [{ title }]}
      actions={
        <Stack direction="row" alignItems="center" gap={1}>
          <Tooltip title="بارگذاری مجدد" placement="top" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>

          {!rowActions.includes("details") && (
            <Button
              variant="contained"
              onClick={handleCreateClick}
              startIcon={<AddIcon />}
            >
              ساختن جدید
            </Button>
          )}
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        {error ? (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={rowsState.rows}
            rowCount={rowsState.rowCount}
            columns={dynamicColumns}
            getRowId={(row) => row._id}
            pagination
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            loading={isLoading}
            initialState={initialState}
            showToolbar
            localeText={muiLocaleText}
            pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
            sx={{
              [`& .${gridClasses.overlayWrapper}`]: {
                position: "unset",
              },
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.row}:hover`]: {
                cursor: "pointer",
              },
            }}
            slotProps={{
              loadingOverlay: {
                variant: "circular-progress",
                noRowsVariant: "circular-progress",
              },
              baseIconButton: {
                size: "small",
              },
            }}
            getRowHeight={(params) => {
              if (
                (params.model.media && params.model.media.length > 0) ||
                params.model.image
              ) {
                return 120;
              }
              return null;
            }}
          />
        )}
      </Box>

      {formMode === "drawer" && FormComponent && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
            sx: {
              zIndex: (theme) => theme.zIndex.modal + 1000,
            },
          }}
          PaperProps={{
            sx: {
              position: "fixed",
              zIndex: (theme) => theme.zIndex.modal + 1000,
              ...(isMobile
                ? { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 }
                : { width: 400, maxWidth: "100vw", top: 0 }),
            },
          }}
        >
          <Box sx={{ p: 2, height: "100%" }}>
            <FormComponent
              mode={drawerMode}
              data={drawerMode === "edit" ? selectedRow : null}
              onClose={handleDrawerClose}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Box>
        </Drawer>
      )}
    </PageContainer>
  );
}
