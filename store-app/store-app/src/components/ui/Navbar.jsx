import { useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Container,
  Box,
  Badge,
  Popper,
  Grow,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useCart } from "../../context/CartContext";
import Logo from "./Logo";

/* ---- routes ---- */
const pages = [
  { name: "Home", path: "/home" },
  { name: "Products", path: "/products" },
  { name: "Error", path: "/errors" },
];
const settings = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export default function Navbar() {
  const navigate = useNavigate();

  /* ---- local state ---- */
  const [navAnchor, setNavAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [pending, setPending] = useState({});
  const [clearing, setClearing] = useState(false);
  const cartBtnRef = useRef(null);

  /* ---- cart context ---- */
  const { cart, inc, dec, remove, clear } = useCart();
  const uniqueCount = cart.length;
  const totalPrice = cart.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 0),
    0
  );

  /* ---- helpers ---- */
  const go = (path) => {
    navigate(path);
    setNavAnchor(null);
    setUserAnchor(null);
    setOpenCart(false);
  };

  const lock = (id, fn) => async () => {
    setPending((m) => ({ ...m, [id]: true }));
    try {
      await fn();
    } finally {
      setPending((m) => ({ ...m, [id]: false }));
    }
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <ShoppingCartIcon
              sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
            />
            <Logo
              variant="h6"
              component="a"
              href="/"
              className="logo"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              STORE
            </Logo>

            {/* mobile menu */}
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <IconButton
                color="inherit"
                onClick={(e) => setNavAnchor(e.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={navAnchor}
                open={Boolean(navAnchor)}
                onClose={() => setNavAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {pages.map(({ name, path }) => (
                  <MenuItem key={name} onClick={() => go(path)}>
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* mobile logo */}
            <ShoppingCartIcon
              sx={{ mr: 1, display: { xs: "flex", md: "none" } }}
            />
            <Logo
              variant="h5"
              component="a"
              href="/"
              className="logo"
              sx={{ mr: 2, flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              STORE
            </Logo>

            {/* desktop links */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, path }) => (
                <Button
                  key={name}
                  sx={{ color: "white", mx: 1 }}
                  onClick={() => go(path)}
                >
                  {name}
                </Button>
              ))}
            </Box>

            {/* cart badge */}
            <IconButton
              color="inherit"
              ref={cartBtnRef}
              onClick={() => setOpenCart((o) => !o)}
              sx={{ mr: 1 }}
            >
              <Badge
                badgeContent={uniqueCount}
                color="error"
                invisible={uniqueCount === 0}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* user avatar */}
            <Tooltip title="Account">
              <IconButton onClick={(e) => setUserAnchor(e.currentTarget)}>
                <Avatar alt="User" src="/static/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userAnchor}
              open={Boolean(userAnchor)}
              onClose={() => setUserAnchor(null)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {settings.map(({ name, path }) => (
                <MenuItem key={name} onClick={() => go(path)}>
                  {name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* cart popper */}
      <Popper
        open={openCart}
        anchorEl={cartBtnRef.current}
        placement="bottom-end"
        transition
        disablePortal
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
        sx={{ zIndex: 1600 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                width: 320,
                maxHeight: 420,
                overflowY: "auto",
                p: 2,
                boxShadow: 6,
              }}
            >
              <Typography fontWeight={600} gutterBottom>
                My Cart
              </Typography>

              {cart.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Cart is empty.
                </Typography>
              )}

              {/* items */}
              {cart.map((item) => {
                if (!item) return null; // güvenlik
                const { id, title, image, qty } = item;
                return (
                  <Box
                    key={id}
                    sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={title}
                      sx={{
                        width: 44,
                        height: 44,
                        objectFit: "cover",
                        borderRadius: 1,
                        mr: 1.5,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" noWrap>
                        {title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={lock(id, () => dec(id))}
                          disabled={pending[id] || (Number(qty) || 0) <= 0}
                        >
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        <Typography mx={0.5}>{Number(qty) || 0}</Typography>
                        <IconButton
                          size="small"
                          onClick={lock(id, () => inc(id))}
                          disabled={pending[id]}
                        >
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={lock(id, () => remove(id))}
                      disabled={pending[id]}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}

              {cart.length > 0 && (
                <Fragment>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Total:{" "}
                    {totalPrice.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={async () => {
                        setClearing(true);
                        try {
                          await clear();
                        } finally {
                          setClearing(false);
                        }
                      }}
                      disabled={clearing || uniqueCount === 0}
                    >
                      Clear
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        alert("Checkout coming soon!");
                        setOpenCart(false);
                      }}
                    >
                      Checkout
                    </Button>
                  </Box>
                </Fragment>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}
