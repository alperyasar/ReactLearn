// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "../components/ui/Navbar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
