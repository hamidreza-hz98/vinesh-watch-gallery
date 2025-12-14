export const setFilePath = (path) => {
  if (!path) return;

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const formattedPath = path?.replace(/\\/g, "/");

  return `${BACKEND_URL}${formattedPath}`;
};
