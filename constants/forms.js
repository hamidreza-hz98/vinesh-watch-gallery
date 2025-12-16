export const userInformationDefaultValues = (data) => ({
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  phone: data?.phone || "",
  email: data?.email || "",
  birthdate: data?.birthdate || "",
  oldPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
})