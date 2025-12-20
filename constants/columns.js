import { formatDate, formatDateAndTime } from "@/lib/date";
import { setFilePath } from "@/lib/media";
import { calculateFinalPrice, formatPrice, toPersian } from "@/lib/number";
import { Box, Chip } from "@mui/material";
import Image from "next/image";
import { orderStatuses } from "./general";

export const brandColumns = [
  {
    field: "image",
    headerName: "لوگو",
    width: 120,
    renderCell: (params) => {
      const image = params.row.logo || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={image.path}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "نام برند",
    width: 100,
  },
  {
    field: "englishName",
    headerName: "نام انگلیسی",
    width: 100,
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const categoryColumns = [
  {
    field: "image",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.image || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={image.path}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "نام دسته بندی",
    width: 180,
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const productColumns = [
  {
    field: "media",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.media[0] || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={image.path}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "title",
    headerName: "نام محصول",
    width: 200,
  },
  {
    field: "price",
    headerName: "قیمت",
    width: 100,
    valueGetter: (price) => formatPrice(price),
  },
  {
    field: "stock",
    headerName: "موجودی در انبار",
    width: 100,
    valueGetter: (stock) => formatPrice(stock),
  },
  {
    field: "soldNumber",
    headerName: "تعداد فروش",
    width: 100,
    valueGetter: (soldNumber) => formatPrice(soldNumber),
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
    valueGetter: (visits) => formatPrice(visits),
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const customerColumns = [
  {
    field: "firstName",
    headerName: "نام",
    width: 140,
    renderCell: (params) => {
      const firstName = params.row.firstName;
      const lastName = params.row.lastName;

      return `${firstName} ${lastName}`;
    },
  },

  {
    field: "phone",
    headerName: "شماره تلفن",
    width: 160,
    valueGetter: (phone) => toPersian(phone),
  },

  { field: "email", headerName: "ایمیل", width: 250 },

  {
    field: "birthdate",
    headerName: "تولد",
    width: 180,
    valueGetter: (birthdate) => formatDate(birthdate) || "",
  },

  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const orderColumns = [
  { field: "code", headerName: "کد", width: 120 },

  {
    field: "status",
    headerName: "وضعیت",
    width: 200,
    renderCell: (params) => {
      const status = params.row.status || "";

      return (
        <Chip
          label={orderStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={orderStatuses[status].color}
          icon={orderStatuses[status].icon}
        />
      );
    },
  },

  {
    field: "customer",
    headerName: "مشتری",
    width: 150,
    valueGetter: (customer) => toPersian(customer?.phone),
  },

  {
    field: "price",
    headerName: "مبلغ",
    width: 150,
    valueGetter: (price) => `${formatPrice(calculateFinalPrice(price))} تومان`,
  },

  {
    field: "createdAt",
    headerName: "تاریخ ثبت",
    width: 250,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
];

export const contactFormColumns = [
  {
    field: "fullName",
    headerName: "نام",
    width: 200,
  },
  {
    field: "mobile",
    headerName: "نام",
    width: 200,

    valueGetter: (mobile) => toPersian(mobile),
  },
  {
    field: "message",
    headerName: "پیام",
    width: 400,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ارسال",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
];
