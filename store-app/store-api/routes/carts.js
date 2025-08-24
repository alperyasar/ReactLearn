// routes/carts.js
const express = require("express");
const router = express.Router();

// Doğru import: listedeki ürünü ID ile getiren fonksiyon
const { get: getProductById } = require("../data/products");

// Demo: tek bir global sepet
const cart = { cartItems: [] }; // { product, quantity }

const toPid = (v) => String(v ?? "");

// GET /carts -> sepeti getir
router.get("/", (_req, res) => {
  res.json(cart);
});

// POST /carts?productId=..&quantity=..
router.post("/", async (req, res, next) => {
  try {
    const productId = toPid(req.query.productId || req.body?.productId);
    const quantity = Number(req.query.quantity || req.body?.quantity || 1);
    if (!productId)
      return res.status(400).json({ message: "productId is required" });

    // Ürünü data katmanından çek
    const product = await getProductById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    cart.cartItems = cart.cartItems || [];
    const line = cart.cartItems.find(
      (ci) => toPid(ci.product.id) === productId
    );
    if (line) line.quantity += quantity;
    else cart.cartItems.push({ product, quantity });

    res.json(cart);
  } catch (e) {
    next(e);
  }
});

// DELETE /carts?productId=..&quantity=..
router.delete("/", async (req, res, next) => {
  try {
    const productId = toPid(req.query.productId || req.body?.productId);
    const quantity = Number(req.query.quantity || req.body?.quantity || 1);

    cart.cartItems = cart.cartItems || [];
    const idx = cart.cartItems.findIndex(
      (ci) => toPid(ci.product.id) === productId
    );
    if (idx < 0)
      return res.status(404).json({ message: "Could not find the cart item" });

    cart.cartItems[idx].quantity -= quantity;
    if (cart.cartItems[idx].quantity <= 0) cart.cartItems.splice(idx, 1);

    res.json(cart);
  } catch (e) {
    next(e);
  }
});

// DELETE /carts/clear -> tümünü temizle
router.delete("/clear", (_req, res) => {
  cart.cartItems = [];
  res.json(cart);
});

module.exports = router;
