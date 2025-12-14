import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/images/background/shape-01.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
