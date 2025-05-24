import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
      <SearchOffIcon sx={{ fontSize: 80, color: "warning.main" }} />
      <Typography variant="h3" gutterBottom>
        404 – Page Not Found
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        The page you are looking for doesn’t exist or has been moved.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </Container>
  );
}
