"use client";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectCustomerAddresses } from "@/store/address/address.selector";

const AddressCard = ({
  address,
  selectedAddressId,
  onSelect,
  onDelete,
  onEdit,
  anchorEl,
  isMenuOpen,
  onCloseMenu,
  onMenuOpen,
  menuAddressId,
  controls = true,
  isInCart = true
}) => {
  const theme = useTheme();

  const addresses = useSelector(selectCustomerAddresses);

  return (
    <Paper
      key={address._id}
      variant="outlined"
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: isInCart ? "pointer" : "default",
        borderColor:
          isInCart && selectedAddressId === address._id
            ? theme.palette.primary.main
            : undefined,
      }}
      onClick={() => isInCart && onSelect(address)}
    >
      <Box display="flex" alignItems="center" flexGrow={1}>
        <Box sx={{ textAlign: "right" }}>
          <Typography fontSize={18} fontWeight={600}>
            {address.name}
            {" -  تحویل گیرنده: "} {address.recipientName}{" "}
            {selectedAddressId === address._id && "( انتخاب شده )"}{" "}
          </Typography>

          <Typography fontSize={15} variant="body2">
            {address.address}
          </Typography>

          <Typography fontSize={14} variant="body2">
            {address.province} - {address.city} - {address.zipCode}
          </Typography>
        </Box>
      </Box>

      {controls && (
        <>
          {/* Desktop Actions */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(address);
              }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(address);
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onMenuOpen(e, address._id);
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={onCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(addresses.find((a) => a._id === menuAddressId));
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              ویرایش
            </MenuItem>

            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(addresses.find((a) => a._id === menuAddressId));
              }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              حذف
            </MenuItem>
          </Menu>
        </>
      )}
    </Paper>
  );
};

export default AddressCard;
