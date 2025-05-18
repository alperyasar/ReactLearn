// src/components/ui/Logo.jsx
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Logo = styled(Typography)(() => ({
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  textDecoration: "none",
  color: "inherit",
}));

export default Logo;
