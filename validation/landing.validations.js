import * as yup from "yup";

const iranPhoneRegex = /^09\d{9}$/;

export const loginFormValidationSchema = yup.object({
  phone: yup
    .string()
    .matches(iranPhoneRegex, "شماره همراه معتبر نیست.")
    .required("شماره همراه الزامی است."),
  password: yup.string().required("رمز عبور الزامی است."),
});

export const signupFormValidationSchema = yup.object({
  firstName: yup.string().required("نام الزامی است."),
  lastName: yup.string().required("نام خانوادگی الزامی است."),
  phone: yup
    .string()
    .matches(iranPhoneRegex, "شماره همراه معتبر نیست.")
    .required("شماره همراه الزامی است."),
  password: yup.string().required("رمز عبور الزامی است."),
});

export const addressFormValidationSchema = yup.object().shape({
    name: yup.string().required("نام آدرس الزامی است"),
    recipientName: yup.string(),
    recipientPhone: yup.string().matches(iranPhoneRegex, "شماره همراه معتبر نیست."),
    address: yup.string().required("آدرس الزامی است"),
    zipCode: yup.string().length(10, "کد پستی باید 10 رقم باشد.").required("کد پستی الزامی است"),
    province: yup.string().required("استان الزامی است"),
    city: yup.string().required("شهر الزامی است"),
  });

  export const userInformationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("نام ضروری است"),

  lastName: yup
    .string()
    .trim()
    .required("نام‌خانوادگی ضروری است"),

  phone: yup
    .string()
    .matches(iranPhoneRegex, "شماره موبایل معتبر نیست (مثال: 09123456789)")
    .required("شماره موبایل ضروری است"),

  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل ضروری است"),

  birthdate: yup
    .string()
    .nullable(),

 oldPassword: yup
  .string()
  .nullable()
  .transform((value) => (value === "" ? null : value)),

newPassword: yup
  .string()
  .nullable()
  .transform((value) => (value === "" ? null : value)),

newPasswordConfirmation: yup
  .string()
  .nullable()
  .transform((value) => (value === "" ? null : value))
  .oneOf([yup.ref("newPassword"), null], "تکرار رمز جدید مطابق نیست")
});

export const contactSchema = yup.object().shape({
  fullName: yup.string()
    .required("وارد کردن نام و نام خانوادگی الزامی است")
    .min(3, "حداقل ۳ کاراکتر وارد کنید")
    .max(50, "حداکثر ۵۰ کاراکتر وارد کنید"),

  mobile: yup.string()
    .required("شماره تماس الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر وارد کنید"),

  message: yup.string()
    .required("نوشتن پیام الزامی است")
    .min(10, "حداقل ۱۰ کاراکتر وارد کنید")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر وارد کنید"),
});