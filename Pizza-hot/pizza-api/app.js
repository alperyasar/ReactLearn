const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs/promises");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // OPTIONS’u da ekliyoruz
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Preflight ise 200 ile cevapla
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Pizzaları listele
app.get("/pizzas", async (req, res) => {
  const pizzas = await fs.readFile("data/pizzas.json", "utf8");
  res.json(JSON.parse(pizzas));
});

// Sipariş oluştur
app.post("/orders", async (req, res) => {
  const { order } = req.body;

  // temel varlık kontrolü
  if (!order || !order.items || order.items.length === 0) {
    return res.status(400).json({ message: "No data sent." });
  }

  const customer = order.customer || {};

  // müşteri validasyonları
  if (
    !customer.name?.trim() ||
    !customer.email?.includes("@") ||
    !/^[0-9]{11}$/.test(customer.phone) ||
    !customer.city?.trim() ||
    !customer.district?.trim() ||
    !customer.street?.trim()
  ) {
    return res.status(400).json({
      message: "Please fill all required fields correctly.",
    });
  }

  // Yeni sipariş objesi
  const newOrder = {
    ...order,
    id: Date.now().toString(),
  };

  // orders.json’a ekle
  const orders = await fs.readFile("data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("data/orders.json", JSON.stringify(allOrders, null, 2));

  res.status(201).json({ message: "Order added!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
