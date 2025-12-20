import DashboardThemeProvider from "@/theme/dashboard/provider";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <DashboardThemeProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/images/background/shape-01.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </div>
    </DashboardThemeProvider>
  );
};

export default AuthLayout;
