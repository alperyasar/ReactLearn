import { Box, Button } from "@mui/material";
import requests from "../../api/apiClient";

export default function ErrorPage() {
  return (
    <Box>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          requests.errors.get400();
        }}
      >
        Bad Request
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          requests.errors.get401();
        }}
      >
        Unauthorized
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          requests.errors.get403();
        }}
      >
        Validation Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          requests.errors.get404();
        }}
      >
        Not Found
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          requests.errors.get500();
        }}
      >
        Server Error
      </Button>
    </Box>
  );
}
