import PeopleIcon from "@mui/icons-material/People"
import WatchIcon from "@mui/icons-material/Watch"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentsIcon from "@mui/icons-material/Payments"

export const summaryData = [
  { title: "مشتری", value: 1240, icon: <PeopleIcon />, color: "primary.main" },
  { title: "محصول ثبت شده", value: 86, icon: <WatchIcon />, color: "secondary.main" },
  { title: "سفارش‌", value: 432, icon: <ShoppingCartIcon />, color: "warning.main" },
  { title: "تومان فروش", value: 388000000, icon: <PaymentsIcon />, color: "success.main" }
]

export const revenueData = [
  { month: "فروردین", value: 120 },
  { month: "اردیبهشت", value: 210 },
  { month: "خرداد", value: 190 },
  { month: "تیر", value: 260 },
  { month: "مرداد", value: 220 },
  { month: "شهریور", value: 160 },
  { month: "مهر", value: 240 },
  { month: "آبان", value: 300 },
  { month: "آذر", value: 180 },
  { month: "دی", value: 210 },
  { month: "بهمن", value: 270 },
  { month: "اسفند", value: 350 },
]

export const topVisitedProducts = [
  { name: "Amiran X1", visits: 540 },
  { name: "Amiran Classic", visits: 430 },
  { name: "Amiran Gold", visits: 290 },
]

export const topSoldProducts = [
  { name: "Amiran Gold", sales: 120 },
  { name: "Amiran Pro", sales: 95 },
  { name: "Amiran X1", sales: 70 },
]

export const orders = {
  processing: [
    { id: 1, user: "علی رضایی", price: 5600000, date: "1403/02/12" },
    { id: 2, user: "سارا محمدی", price: 3200000, date: "1403/02/13" },
    { id: 3, user: "امیر احمدی", price: 7900000, date: "1403/02/10" },
    { id: 4, user: "رضا کریمی", price: 4200000, date: "1403/02/08" },
    { id: 5, user: "حسن نادری", price: 3100000, date: "1403/02/05" },
  ],
  shipping: [
    { id: 4, user: "رضا کریمی", price: 4200000, date: "1403/02/08" },
  ],
  failed: [
    { id: 5, user: "حسن نادری", price: 3100000, date: "1403/02/05" },
  ]
}
