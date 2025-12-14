export function formatNumber(number, separator = ",") {
  if (number == null) return "";

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function toPersian(number) {
  if (number == null) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function toEnglish(number) {
  if (!number) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d).toString());
}

export function formatPrice(number, separator = "،") {
  if (number == null) return "";
  const formatted = formatNumber(number, separator);
  return toPersian(formatted);
}

export function toNumber(value) {
  if (!value) return 0;

  return parseInt(value.replace(/[^\d]/g, ""), 10);
}

export const calculateFinalPrice = ({ products, shipment, discounts }) => {
  return products + shipment - discounts
}