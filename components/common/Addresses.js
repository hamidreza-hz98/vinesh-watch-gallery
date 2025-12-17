"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddressForm from "@/components/forms/AddressForm";

import nookies from "nookies";
import DeleteConfirmationDialog from "@/components/drawers/DeleteConfirmationDialog";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import NoDataAvailable from "./NoDataAvailable";
import AddressCard from "@/components/cards/AddressCard";
import { fetchWithAuth } from "@/lib/fetch";
import {
  addressApi,
  customerAddressApi,
  modifyAddressApi,
  modifyCartApi,
} from "@/constants/api.routes";
import { useLandingData } from "@/providers/LandingDataProvider";
import Loader from "./Loader";

const Addresses = ({ isInCart = true, controls = true }) => {
  const { customer } = nookies.get();
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useLandingData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { addresses } = await fetchWithAuth(customerAddressApi(customer));

        setAddresses(addresses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customer]);

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
      setLoading(true);
      const { message } = await fetchWithAuth(
        modifyAddressApi(addressToDelete._id),
        { method: "DELETE" }
      );

      const { addresses } = await fetchWithAuth(customerAddressApi(customer));

      setAddresses(addresses);

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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUpdate = async (body) => {
    try {
      setLoading(true);

      const { message } = editingAddress
        ? await fetchWithAuth(modifyAddressApi(editingAddress._id), {
            method: "PUT",
            body
          })
        : await fetchWithAuth(addressApi, { method: "POST", body: { ...body, customer } });

      const { addresses } = await fetchWithAuth(customerAddressApi(customer));

      setAddresses(addresses);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAddress = async (address) => {
    try {
      setLoading(true);

      const { data } = await fetchWithAuth(modifyCartApi(cart._id), {
        method: "PUT",
        body: {
          customerId: customer,
          action: "setAddress",
          addressId: address._id,
        },
      });

      setCart(data)

      notifications.show("آدرس مورد نظر انتخاب شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            addresses={addresses}
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
