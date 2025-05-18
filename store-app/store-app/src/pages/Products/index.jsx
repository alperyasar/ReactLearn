import { useEffect, useState } from "react";
import { Container, Typography, Skeleton, Alert, Box } from "@mui/material";
import ProductCard from "../../components/ui/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  // localStorage helpers
  const getLS = (key) => JSON.parse(localStorage.getItem(key) || "[]");
  const [likedIds, setLikedIds] = useState(() => getLS("liked"));
  const [cartIds, setCartIds] = useState(() => getLS("cart"));

  const syncLS = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      syncLS("liked", next);
      return next;
    });
  };

  const addToCart = (id) => {
    setCartIds((prev) => {
      if (prev.includes(id)) return prev; // iki kere ekleme
      const next = [...prev, id];
      syncLS("cart", next);
      return next;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5001/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setProducts(await res.json());
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const gridStyles = {
    display: "grid",
    gap: 3,
    gridTemplateColumns: {
      xs: "repeat(auto-fill, minmax(150px,1fr))",
      sm: "repeat(auto-fill, minmax(200px,1fr))",
      md: "repeat(auto-fill, minmax(230px,1fr))",
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Our Products
      </Typography>

      {error && <Alert severity="error">Error: {error}</Alert>}

      <Box sx={gridStyles}>
        {/* Loading skeleton */}
        {!products &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={280}
              sx={{ borderRadius: 3 }}
            />
          ))}

        {/* Product cards */}
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            liked={likedIds.includes(p.id)}
            onToggleLike={toggleLike}
            onAddToCart={addToCart}
          />
        ))}
      </Box>

      {/* Empty state */}
      {products?.length === 0 && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      )}
    </Container>
  );
}
