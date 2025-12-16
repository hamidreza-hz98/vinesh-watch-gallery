import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/PersonOutline";
import WatchIcon from "@mui/icons-material/Watch";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import QuizIcon from "@mui/icons-material/Quiz";
import GavelIcon from "@mui/icons-material/Gavel";

const routes = {
  home: {
    label: "صفحه اصلی",
    link: "/",
    icon: <HomeIcon />,
  },

  products: {
    label: "محصولات",
    link: "/products",
    icon: <WatchIcon />,
  },

  productDetails: (slug) => ({
    label: "جزییات محصول",
    link: `/products/${slug}`,
    icon: <ImportContactsIcon />,
  }),

  cart: {
    label: "سبد خرید",
    link: "/cart",
    icon: <ShoppingCartIcon />,
  },

  paymentResult: {
    label: "نتیجه پرداخت",
    link: "/payment-result",
    icon: <PaymentIcon />,
  },

  profile: {
    label: "پروفایل",
    link: "/profile",
    icon: <PersonIcon />,
  },

  profileAddresses: {
    label: "آدرس های من",
    link: "/profile/addresses",
    icon: <LocationPinIcon />,
  },

  profileOrders: {
    label: "سفارش های من",
    link: "/profile/orders",
    icon: <ShoppingBagIcon />,
  },

  profileOrderDetails: (orderId) => ({
    label: "جزییات سفارش",
    link: `/profile/orders/${orderId}`,
    icon: <ShoppingBagIcon />,
  }),

  about: {
    label: "درباره ما",
    link: "/about",
    icon: <InfoIcon />,
  },

  contact: {
    label: "ارتباط با ما",
    link: "/contact",
    icon: <PhoneEnabledIcon />,
  },

  terms: {
    label: "قوانین و مقررات",
    link: "/terms",
    icon: <GavelIcon />,
  },

  faq: {
    label: "سوالات متداول",
    link: "/faq",
    icon: <QuizIcon />,
  },
};

export default routes;
