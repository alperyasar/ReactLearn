import { Alert, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerErrorPage() {
  const state = useLocation();
  return (
    <Paper sx={{ p: 2 }}>
      {state?.error ? (
        <>
          <Typography variant="h4">
            {state.error.message} - {state.status}
          </Typography>
          <Alert severity="error">
            {state.error.details || "Internal Server Error"}
          </Alert>
        </>
      ) : (
        <>
          <Typography variant="h4">Server Error</Typography>
          <Alert severity="error">Internal Server Error</Alert>
        </>
      )}
    </Paper>
  );
}
