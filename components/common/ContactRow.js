import Link from "next/link";
import { Box, Typography } from "@mui/material";

const ContactRow = ({ href, icon, label = "", color }) => {
  return (
    <Link href={href} target="_blank" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          p: 1.2,
          borderRadius: 2,
          transition: "0.2s",
          color,
          "&:hover": {
            backgroundColor: `${color}15`,
            transform: "translateY(-2px)",
          },
        }}
      >
        {icon}
        
        {label &&
        <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
          {label}
        </Typography>
        }
      </Box>
    </Link>
  );
};

export default ContactRow;
