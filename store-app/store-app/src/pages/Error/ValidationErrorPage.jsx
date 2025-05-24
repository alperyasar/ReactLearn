import {
  Alert,
  Paper,
  Typography,
  List,
  ListItem,
  Button, // ← EKLENDİ
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

export default function ValidationErrorPage() {
  const { state } = useLocation(); // { error, status }
  const details = state?.error?.errors ?? {};

  return (
    <Paper sx={{ maxWidth: 600, m: "40px auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        403 – Validation Error
      </Typography>

      <Alert severity="error" sx={{ mb: 2 }}>
        {state?.error?.message || "Request failed validation checks"}
      </Alert>

      {Object.keys(details).length > 0 && (
        <>
          <Typography variant="subtitle1">Error details:</Typography>
          <List dense>
            {Object.entries(details).map(([k, v]) => (
              <ListItem key={k} sx={{ display: "list-item", pl: 2 }}>
                {k}: {v}
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
        Back to Home
      </Button>
    </Paper>
  );
}
