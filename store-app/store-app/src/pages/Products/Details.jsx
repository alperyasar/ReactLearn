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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import requests from "../../api/apiClient";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // unmount sırasında setState engellemek için
    (async () => {
      setLoading(true);
      try {
        const data = await requests.products.getById(id); // Axios ile çek
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => (isMounted = false);
  }, [id]);

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
              ${Number(product.price).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                fullWidth
                onClick={() => {
                  // Add to cart functionality will be implemented here
                  console.log("Add to cart:", product.id);
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
