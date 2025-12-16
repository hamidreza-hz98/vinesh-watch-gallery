"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const DeleteConfirmationDialog = ({
  open,
  entity,
  title,
  text,
  deleteText = "حذف",
  cancelText = "انصراف",
  onClose,
  onDelete,
}) => {
  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>{title} </DialogTitle>

      <DialogContent>
        <Typography>{text}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}> {cancelText} </Button>

        <Box sx={{ flex: "1 1" }} />

        <Button
          color="error"
          onClick={() => onDelete(entity.text)}
          variant="contained"
        >
          {deleteText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
