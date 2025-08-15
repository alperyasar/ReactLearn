// src/components/ui/ProductCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  CircularProgress, // ← eklendi
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, liked, onToggleLike }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    add(product) // add() artık Promise döndürüyor
      .catch(() => {
        /* toast vs. gösterebilirsin */
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform .2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      {/* ---- Görsel ---- */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5001/images/${product.image}`}
          alt={product.title}
          sx={{ objectFit: "cover" }}
        />
        <IconButton
          size="small"
          onClick={() => onToggleLike(product.id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          <FavoriteIcon color={liked ? "error" : "action"} />
        </IconButton>
      </Box>

      {/* ---- İçerik ---- */}
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 2,
          }}
        >
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${Number(product.price).toLocaleString()}
        </Typography>

        {/* ---- Butonlar ---- */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="small"
            onClick={handleAdd}
            disabled={loading}
            title="Add to Cart"
          >
            {loading ? <CircularProgress size={20} /> : <AddShoppingCartIcon />}
          </IconButton>

          <IconButton
            size="small"
            onClick={() => navigate(`/products/${product.id}`)}
            title="View Details"
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
