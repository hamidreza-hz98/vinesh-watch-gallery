import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";

import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";
import { faIR } from "@mui/x-date-pickers/locales";

export const sidebarRoutes = [
  {
    header: "صفحات اصلی",
    items: [
      {
        id: "dashboard",
        title: "داشبورد",
        icon: DashboardOutlinedIcon,
        href: "/dashboard",
      },
      {
        id: "products",
        title: "محصولات",
        icon: Inventory2OutlinedIcon,
        href: "/dashboard/products",
      },
      {
        id: "categories",
        title: "دسته بندی ها",
        icon: CategoryOutlinedIcon,
        href: "/dashboard/categories",
      },
      {
        id: "customers",
        title: "مشتریان",
        icon: SupervisedUserCircleOutlinedIcon,
        href: "/dashboard/customers",
      },
      {
        id: "orders",
        title: "سفارش ها",
        icon: ShoppingCartCheckoutOutlinedIcon,
        href: "/dashboard/orders",
      },
    ],
  },
  {
    header: "عمومی",
    items: [
      {
        id: "media",
        title: "مدیا",
        icon: PermMediaOutlinedIcon,
        href: "/dashboard/media",
      },
      {
        id: "brands",
        title: "برند ها",
        icon: LayersOutlinedIcon,
        href: "/dashboard/brands",
      },
      {
        id: "contact",
        title: "فرم تماس",
        icon: AttachEmailOutlinedIcon,
        href: "/dashboard/contact",
      },

      // {
      //   id: "tags",
      //   title: "Tags",
      //   icon: TagOutlinedIcon,
      //   href: "/dashboard/tags",
      // },
    ],
  },
  // {
  //   header: "مالی",
  //   items: [

  //     {
  //       id: "transactions",
  //       title: "Transactions",
  //       icon: ReceiptOutlinedIcon,
  //       href: "/dashboard/transactions",
  //     },
  //     {
  //       id: "paymentGateways",
  //       title: "Payment Gateways",
  //       icon: AccountBalanceOutlinedIcon,
  //       href: "/dashboard/payment-gateways",
  //     },
  //     {
  //       id: "carts",
  //       title: "Carts",
  //       icon: ShoppingBasketOutlinedIcon,
  //       href: "/dashboard/carts",
  //     },
  //   ],
  // },
  {
    header: "تنظیمات سایت",
    items: [
      {
        id: "general",
        title: "تنظیمات عمومی",
        icon: SettingsApplicationsOutlinedIcon,
        href: "/dashboard/settings/general",
      },
      {
        id: "seo",
        title: "سئو",
        icon: ScreenSearchDesktopOutlinedIcon,
        href: "/dashboard/settings/default-seo",
      },
      {
        id: "about",
        title: "درباره ما",
        icon: InfoOutlinedIcon,
        href: "/dashboard/settings/about",
      },
      {
        id: "faq",
        title: "سوالات متداول",
        icon: LiveHelpOutlinedIcon,
        href: "/dashboard/settings/faq",
      },
      {
        id: "terms",
        title: "قوانین و مقررات",
        icon: GavelOutlinedIcon,
        href: "/dashboard/settings/terms",
      },
    ],
  },
];

export const orderStatuses = {
  pending_payment: {
    name: "در انتظار پرداخت",
    color: "text",
    icon: <RestoreOutlinedIcon />,
  },
  processing: {
    name: "در حال پردازش",
    color: "primary",
    icon: <HourglassBottomOutlinedIcon />,
  },
  failed: {
    name: "پرداخت ناموفق",
    color: "error",
    icon: <CreditCardOffOutlinedIcon />,
  },
  shipping: {
    name: "در حال ارسال",
    color: "warning",
    icon: <RocketLaunchOutlinedIcon />,
  },
  delivered: {
    name: "ارسال شده",
    color: "success",
    icon: <CheckCircleOutlineOutlinedIcon />,
  },
  // canceled: {
  //   name: "Canceled",
  //   color: "error",
  //   icon: <CancelOutlinedIcon />,
  // },
};

export const muiLocaleText = {
  ...faIR.components.MuiLocalizationProvider.defaultProps.localeText,
  noRowsLabel: "بدون سطر",
  noResultsOverlayLabel: "نتیجه‌ای پیدا نشد.",

  toolbarDensity: "تراکم",
  toolbarDensityLabel: "تراکم",
  toolbarDensityCompact: "فشرده",
  toolbarDensityStandard: "استاندارد",
  toolbarDensityComfortable: "راحت",

  toolbarColumns: "ستون‌ها",
  toolbarColumnsLabel: "ستون‌ها را انتخاب کنید",

  toolbarFilters: "فیلترها",
  toolbarFiltersLabel: "نمایش فیلترها",
  toolbarFiltersTooltipHide: "مخفی کردن فیلترها",
  toolbarFiltersTooltipShow: "نمایش فیلترها",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلترهای فعال` : `${count} فیلتر فعال`,

  toolbarQuickFilterPlaceholder: "جستجو...",
  toolbarQuickFilterLabel: "جستجو",
  toolbarQuickFilterDeleteIconLabel: "حذف",

  toolbarExport: "خروجی",
  toolbarExportLabel: "خروجی",
  toolbarExportCSV: "دانلود به صورت CSV",
  toolbarExportPrint: "چاپ",
  toolbarExportExcel: "دانلود به صورت اکسل",

  columnsManagementSearchTitle: "جستجو",
  columnsManagementNoColumns: "بدون سطر",
  columnsManagementShowHideAllText: "نمایش/مخفی کردن همه",
  columnsManagementReset: "بازنشانی",
  columnsManagementDeleteIconLabel: "پاک کردن",

  filterPanelAddFilter: "افزودن فیلتر",
  filterPanelRemoveAll: "حذف همه",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLogicOperator: "عملگر منطقی",
  filterPanelOperator: "عملگرها",
  filterPanelOperatorAnd: "و",
  filterPanelOperatorOr: "یا",
  filterPanelColumns: "ستون‌ها",
  filterPanelInputLabel: "مقدار",
  filterPanelInputPlaceholder: "فیلتر مقدار",

  filterOperatorContains: "شامل",
  filterOperatorDoesNotContain: "شامل نمیشود",
  filterOperatorEquals: "مساوی",
  filterOperatorDoesNotEqual: "برابر نیست",
  filterOperatorStartsWith: "شروع با",
  filterOperatorEndsWith: "پایان با",
  filterOperatorIs: "هست",
  filterOperatorNot: "نیست",
  filterOperatorAfter: "بعد از",
  filterOperatorOnOrAfter: "معادل یا بعدش",
  filterOperatorBefore: "قبلش",
  filterOperatorOnOrBefore: "معادل یا قبلش",
  filterOperatorIsEmpty: "خالی است",
  filterOperatorIsNotEmpty: "خالی نیست",
  filterOperatorIsAnyOf: "هر یک از",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  headerFilterOperatorContains: "شامل",
  headerFilterOperatorDoesNotContain: "شامل نمیشود",
  headerFilterOperatorEquals: "مساوی",
  headerFilterOperatorDoesNotEqual: "برابر نیست",
  headerFilterOperatorStartsWith: "شروع با",
  headerFilterOperatorEndsWith: "پایان با",
  headerFilterOperatorIs: "هست",
  headerFilterOperatorNot: "نیست",
  headerFilterOperatorAfter: "بعد از",
  headerFilterOperatorOnOrAfter: "معادل یا بعد از",
  headerFilterOperatorBefore: "قبل از",
  headerFilterOperatorOnOrBefore: "معادل یا قبل از",
  headerFilterOperatorIsEmpty: "خالی است",
  headerFilterOperatorIsNotEmpty: "خالی نیست",
  headerFilterOperatorIsAnyOf: "هر یک از",
  "headerFilterOperator=": "مساوی",
  "headerFilterOperator!=": "نامساوی",
  "headerFilterOperator>": "بزرگتر",
  "headerFilterOperator>=": "بزرگتر یا مساوی",
  "headerFilterOperator<": "کوچکتر",
  "headerFilterOperator<=": "کوچکتر یا مساوی",

  filterValueAny: "هرچیزی",
  filterValueTrue: "صحیح",
  filterValueFalse: "غلط",

  columnMenuLabel: "فهرست",
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuManageColumns: "مدیریت ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuHideColumn: "مخفی",
  columnMenuUnsort: "نامرتب‌کردن",
  columnMenuSortAsc: "مرتب‌سازی صعودی",
  columnMenuSortDesc: "مرتب‌سازی نزولی",

  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلتر‌های فعال` : `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: "نمایش فیلترها",
  columnHeaderSortIconLabel: "مرتب‌سازی",

  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} سطرهای انتخاب شده`
      : `${count.toLocaleString()} سطر انتخاب شده`,

  footerTotalRows: "مجموع سطرها:",

  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  checkboxSelectionHeaderName: "چک‌باکس انتخاب",
  checkboxSelectionSelectAllRows: "انتخاب همه‌ی ردیف‌ها",
  checkboxSelectionUnselectAllRows: "لغو انتخاب همه‌ی ردیف‌ها",
  checkboxSelectionSelectRow: "انتخاب ردیف",
  checkboxSelectionUnselectRow: "لغو انتخاب ردیف",

  booleanCellTrueLabel: "صحیح",
  booleanCellFalseLabel: "غلط",

  actionsCellMore: "بیشتر",

  pinToLeft: "سنجاق کردن به چپ",
  pinToRight: "سنجاق کردن به راست",
  unpin: "برداشتن سنجاق",

  treeDataGroupingHeaderName: "گروه‌بندی",
  treeDataExpand: "نمایش فرزندان",
  treeDataCollapse: "پنهان‌سازی فرزندان",

  groupingColumnHeaderName: "گروه‌بندی",
  groupColumn: (name) => `گروه‌بندی براساس ${name}`,
  unGroupColumn: (name) => `لغو گروه‌بندی براساس ${name}`,

  detailPanelToggle: "پنل جزئیات",
  expandDetailPanel: "بازکردن پنل جزئیات",
  collapseDetailPanel: "بستن پنل جزئیات",

  paginationRowsPerPage: "تعداد سطرهای هر صفحه:",

  paginationItemAriaLabel: (type) => {
    if (type === "first") {
      return "رفتن به اولین صفحه";
    }
    if (type === "last") {
      return "رفتن به آخرین صفحه";
    }
    if (type === "next") {
      return "رفتن به صفحه‌ی بعدی";
    }
    return "رفتن به صفحه‌ی قبلی";
  },

  rowReorderingHeaderName: "ترتیب مجدد سطر",

  aggregationMenuItemHeader: "تجمیع",
  aggregationFunctionLabelSum: "جمع",
  aggregationFunctionLabelAvg: "میانگین",
  aggregationFunctionLabelMin: "حداقل",
  aggregationFunctionLabelMax: "حداکثر",
  aggregationFunctionLabelSize: "اندازه",
};

export default sidebarRoutes;
