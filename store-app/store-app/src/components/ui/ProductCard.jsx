import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, liked, onToggleLike }) {
  const navigate = useNavigate();
  const { add } = useCart();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
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

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
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
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="small"
            onClick={() =>
              add({
                id: product.id,
                title: product.title,
                price: product.price,
                image: `http://localhost:5001/images/${product.image}`,
              })
            }
            title="Add to Cart"
          >
            <AddShoppingCartIcon />
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
