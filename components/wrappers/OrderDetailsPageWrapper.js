"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import {
  createOrder,
  getOrderDetails,
  updateOrder,
} from "@/store/order/order.action";
import { selectOrder } from "@/store/order/order.selector";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import OrderForm from "../forms/OrderForm";

const OrderDetailsPageWrapper = ({_id}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderDetails = useSelector(selectOrder);
  const notifications = useNotifications();

  const loadData = React.useCallback(async () => {
      await dispatch(getOrderDetails(_id)).unwrap();
  }, [dispatch, _id]);

  const handleCreateOrUpdateOrder = async (data) => {
    try {
      const status = orderDetails?.shipmentTrackNumber ? "delivered" : data.shipmentTrackNumber ? "shipping" : data.status

      const body= {
        shipmentTrackNumber: data.shipmentTrackNumber,
        status
      }
      

      const message = await dispatch(updateOrder({ _id, body })).unwrap()

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/orders");
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (!orderDetails) {
    return <Loader />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    loadData();
  }, [loadData]);

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
        order={orderDetails || null}
      />
    </PageContainer>
  );
};

export default OrderDetailsPageWrapper;
