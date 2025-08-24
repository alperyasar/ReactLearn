// src/pages/Products/Details.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import requests from "../../api/apiClient";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await requests.products.getById(id);
        if (alive) setProduct(data);
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    setAddLoading(true);
    try {
      await add(product);
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid flex={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid flex={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" variant="h6" gutterBottom>
          Error loading product: {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/products")}
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid flex={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={`http://localhost:5001/images/${product.image}`}
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>

          <Grid flex={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${Number(product.price || 0).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleAdd}
                disabled={addLoading}
                startIcon={
                  addLoading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <ShoppingCartIcon />
                  )
                }
              >
                {addLoading ? "ADDING..." : "ADD TO CART"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
