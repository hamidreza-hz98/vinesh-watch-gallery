/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddressForm from "../forms/AddressForm";
import { selectCustomerAddresses } from "@/store/address/address.selector";
import {
  createAddress,
  getCustomerAddresses,
  updateAddress,
  deleteAddress,
} from "@/store/address/address.actions";
import nookies from "nookies";
import DeleteConfirmationDialog from "../drawers/DeleteConfirmationDialog";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { updateCart } from "@/store/cart/cart.action";
import { selectCart } from "@/store/cart/cart.selector";
import NoDataAvailable from "./NoDataAvailable";
import AddressCard from "../cards/AddressCard";

const Addresses = ({ isInCart = true, controls=true }) => {
  const addresses = useSelector(selectCustomerAddresses);
  const dispatch = useDispatch();
  const { customer } = nookies.get();
  const cart = useSelector(selectCart);
  const notifications = useNotifications();

  const [openForm, setOpenForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(
    cart?.address?._id || null
  );

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAddressId, setMenuAddressId] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Delete Confirm Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

useEffect(() => {
  if (cart?.address?._id) {
    setSelectedAddressId(cart.address._id);
  }
}, [cart?.address?._id]);


  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuAddressId(null);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setOpenForm(true);
    handleMenuClose();
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuAddressId(id);
  };

  const handleOpenDeleteConfirm = (address) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;
    try {
      const message = await dispatch(
        deleteAddress(addressToDelete._id)
      ).unwrap();

      await dispatch(getCustomerAddresses(customer)).unwrap();

      setDeleteDialogOpen(false);
      setAddressToDelete(null);

      notifications.show(message, {
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

  const handleCreateUpdate = async (body) => {
    try {
      const message = editingAddress
        ? await dispatch(updateAddress({ ...editingAddress, body })).unwrap()
        : await dispatch(createAddress({ ...body, customer })).unwrap();

      await dispatch(getCustomerAddresses(customer)).unwrap();

      setOpenForm(false);
      setEditingAddress(null);

      notifications.show(message, {
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

  const handleSelectAddress = async (address) => {
    try {
      dispatch(
        updateCart({
          _id: cart._id,
          options: {
            customerId: customer,
            action: "setAddress",
            addressId: address._id,
          },
        })
      );

      notifications.show("آدرس مورد نظر انتخاب شد!", {
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

  

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
        mb={1}
      >
        <Typography variant="h2">آدرس های من</Typography>

        <Button
          variant="outlined"
          onClick={() => setOpenForm(true)}
          sx={{ mt: 1 }}
        >
          ساخت آدرس جدید
        </Button>
      </Box>

      {addresses && addresses.length !== 0 ? (
        addresses?.map((address, index) => (
          <AddressCard
            address={address}
            selectedAddressId={selectedAddressId}
            key={index}
            onDelete={() => handleOpenDeleteConfirm(address)}
            onEdit={() => handleEdit(address)}
            onSelect={() => handleSelectAddress(address)}
            isMenuOpen={isMenuOpen}
            anchorEl={anchorEl}
            onCloseMenu={handleMenuClose}
            onMenuOpen={handleMenuOpen}
            menuAddressId={menuAddressId}
            controls={controls}
            isInCart={isInCart}
          />
        ))
      ) : (
        <NoDataAvailable
          text="آدرسی برای شما ثبت نشده"
          clickText="ثبت اولین آدرس ارسال"
          onClick={() => setOpenForm(true)}
        />
      )}

      <AddressForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingAddress(null);
        }}
        initialValues={editingAddress || {}}
        onSubmit={handleCreateUpdate}
        isEdit={!!editingAddress}
      />

      <DeleteConfirmationDialog
        entity={addressToDelete}
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onDelete={handleDeleteAddress}
        title="حذف آدرس"
        text={`آیا از حذف آدرس ${addressToDelete?.name} اطمینان دارید؟`}
      />
    </Box>
  );
};

export default Addresses;
