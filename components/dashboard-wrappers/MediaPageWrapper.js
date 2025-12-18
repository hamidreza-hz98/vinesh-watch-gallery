"use client";

import React from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import PageContainer from "../common/PageContainer";
import MediaMasonry from "../common/MediaMasonry";
import MediaForm from "../forms/MediaForm";
import Loader from "../common/Loader";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { useDialogs } from "@/hooks/useDialogs/useDialogs";
import { deleteMedia, getAllMedia } from "@/app/actions/media";

const MediaPageWrapper = ({
  isOnForm = false,
  multiple = false,
  onSelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const notifications = useNotifications();
  const dialogs = useDialogs();

  const [media, setMedia] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState("create");
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedMedia, setSelectedMedia] = React.useState(null);

  /* ---------------------------------- */
  /* FETCH MEDIA */
  /* ---------------------------------- */
  const fetchMedia = React.useCallback(async () => {
    try {
      setLoading(true);

      const query = { page_size: 1000 };
      const res = await getAllMedia(query)

      setMedia(res.data);
    } catch (error) {
      notifications.show(error.message || "خطا در دریافت مدیا", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [notifications]);

  React.useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  /* ---------------------------------- */
  /* DRAWER HANDLERS */
  /* ---------------------------------- */
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  const handleSuccess = React.useCallback(() => {
    fetchMedia();
    handleDrawerClose();
  }, [fetchMedia]);

  const handleCreateClick = () => {
    setDrawerMode("create");
    setSelectedRow(null);
    setDrawerOpen(true);
  };

  const handleRowEdit = (row) => {
    if (isOnForm) {
      setSelectedMedia(row);
    } else {
      setDrawerMode("edit");
      setSelectedRow(row[0]);
      setDrawerOpen(true);
    }
  };

  const handleSelectMedia = () => {
    onSelect(selectedMedia);
  };

  const handleRefresh = () => {
    fetchMedia();
  };

  /* ---------------------------------- */
  /* DELETE MEDIA */
  /* ---------------------------------- */
  const handleDeleteMedia = async (_id) => {
    const confirmed = await dialogs.confirm(
      "آیا از حذف این آیتم اطمینان دارید؟",
      {
        title: "حذف شود؟",
        severity: "error",
        okText: "حذف",
        cancelText: "بازگشت",
      }
    );

    if (!confirmed) return;

    try {
      const res = await deleteMedia(_id)

      fetchMedia();

      notifications.show(res.message, {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error.message || "خطا در حذف مدیا", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageContainer
      title="مدیریت فایل های آپلود شده"
      breadcrumbs={[
        { name: "داشبورد مدیریت فروشگاه", path: "/dashboard" },
        { name: "مدیا", path: "/dashboard/media" },
      ]}
      actions={
        <Stack direction="row" alignItems="center" gap={1}>
          <Tooltip title="بارگذاری مجدد" placement="top" enterDelay={1000}>
            <IconButton size="small" onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            آپلود مدیای جدید
          </Button>

          {isOnForm && (
            <Button
              variant="contained"
              color="success"
              disabled={!selectedMedia}
              onClick={handleSelectMedia}
              startIcon={<DoneOutlinedIcon />}
            >
              تمام
            </Button>
          )}
        </Stack>
      }
    >
      <MediaMasonry
        media={media?.items}
        multiple={multiple}
        onSelect={handleRowEdit}
        onDelete={handleDeleteMedia}
      />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            ...(isMobile
              ? { width: "100vw", height: "100vh" }
              : { width: 400 }),
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%" }}>
          <MediaForm
            mode={drawerMode}
            data={drawerMode === "edit" ? selectedRow : null}
            onClose={handleDrawerClose}
            onSuccess={handleSuccess}
          />
        </Box>
      </Drawer>
    </PageContainer>
  );
};

export default MediaPageWrapper;
