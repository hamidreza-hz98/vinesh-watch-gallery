import * as yup from "yup";

const adminLoginSchema = yup.object().shape({
  username: yup
    .string()
    .transform((value) => (value ? value.trim().toLowerCase() : "")) // trim + lowercase
    .required("وارد کردن نام کاربری الزامی است") // required after transform
    .min(4, "نام کاربری حداقل 4 کاراکتر باشد")
    .matches(
      /^[a-z0-9._]+$/,
      "نام کاربری فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد، نقطه و زیرخط باشد"
    ),
  password: yup
    .string()
    .transform((value) => (value ? value.trim() : "")) // optional trim
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور حداقل 6 کاراکتر باشد"),
});

export default adminLoginSchema;
