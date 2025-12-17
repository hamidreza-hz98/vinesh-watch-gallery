"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import OrderForm from "../forms/OrderForm";
import { getOrderDetails, updateOrder } from "@/app/actions/order";

const OrderDetailsPageWrapper = ({ _id }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();
  const notifications = useNotifications();

  const loadData = React.useCallback(async () => {
    setLoading(true);

    const { data } = await getOrderDetails(_id)

    setOrderDetails(data);

    setLoading(false);
  }, [_id]);

    React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateOrUpdateOrder = async (data) => {
    try {
      const status = orderDetails?.shipmentTrackNumber
        ? "delivered"
        : data.shipmentTrackNumber
        ? "shipping"
        : data.status;

      const body = {
        shipmentTrackNumber: data.shipmentTrackNumber,
        status,
      };

      const { message } = await updateOrder(_id, body)

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/orders");
    } catch (error) {
      notifications.show(error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (loading || !orderDetails) {
    return <Loader />;
  }

  return (
    <PageContainer
      title="مشخصات سفارش:"
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "سفارش ها", path: "/dashboard/orders" },
        { name: _id ? "ویرایش سفارش" : "ساخت سفارش جدید" },
      ]}
    >
      <OrderForm
        onSubmit={handleCreateOrUpdateOrder}
        order={orderDetails}
      />
    </PageContainer>
  );
};

export default OrderDetailsPageWrapper;
