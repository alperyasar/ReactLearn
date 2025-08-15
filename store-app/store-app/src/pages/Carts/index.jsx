import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  inc,
  dec,
  remove,
  clear,
  toggleSelect,
  selectAll,
  selectCartItems,
  selectSelectedPrice,
  selectSelectedQty,
  selectSelectionState,
  selectTotalQty,
} from "./CartSlice";

export default function CartsPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectTotalQty);
  const selectedQty = useSelector(selectSelectedQty);
  const selectedPrice = useSelector(selectSelectedPrice);
  const { checked, indeterminate } = useSelector(selectSelectionState);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <ShoppingCartIcon />
        <Typography variant="h4">Cart</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="subtitle2" color="text.secondary">
          Total items: {totalQty}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => dispatch(selectAll(e.target.checked))}
        />
        <Typography>Select all</Typography>
      </Stack>

      <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {items.map((i) => (
          <ListItem
            key={i.id}
            secondaryAction={
              <IconButton color="error" onClick={() => dispatch(remove(i.id))}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              edge="start"
              checked={!!i.selected}
              onChange={() => dispatch(toggleSelect(i.id))}
              sx={{ mr: 1 }}
            />
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={i.image}
                alt={i.title}
                sx={{ width: 56, height: 56, mr: 1 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontWeight={600} noWrap>
                  {i.title}
                </Typography>
              }
              secondary={
                <Typography color="text.secondary">
                  ${(Number(i.price) || 0).toLocaleString()}
                </Typography>
              }
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => dispatch(dec(i.id))}>
                <RemoveIcon />
              </IconButton>
              <Typography minWidth={16} textAlign="center">
                {i.qty}
              </Typography>
              <IconButton onClick={() => dispatch(inc(i.id))}>
                <AddIcon />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
        {items.length === 0 && (
          <Box p={3}>
            <Typography color="text.secondary">Your cart is empty.</Typography>
          </Box>
        )}
      </List>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          Selected total:{" "}
          {selectedPrice.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}{" "}
          ({selectedQty} pcs)
        </Typography>

        <Box>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={() => dispatch(clear())}
            disabled={items.length === 0}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            disabled={selectedQty === 0}
            onClick={() => alert("Checkout coming soon")}
          >
            Checkout
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
