const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });


// ===============================
// ORDER SCHEMA
// ===============================

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
      },

      instructions: {
        type: String,
      },
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// ===============================
// ORDER MODEL
// ===============================

const Order = mongoose.model("Order", orderSchema);


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("Brew Haven API is running");
});


// ===============================
// CREATE ORDER
// ===============================

app.post("/api/orders", async (req, res) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        message: "Customer information and order items are required.",
      });
    }

    const newOrder = new Order({
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    });

    const savedOrder = await newOrder.save();

    console.log("Order saved:", savedOrder._id);

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });

  } catch (error) {
    console.error("Order save error:", error);

    res.status(500).json({
      message: "Failed to save order",
      error: error.message,
    });
  }
});


// ===============================
// GET ALL ORDERS
// ===============================

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});


// ===============================
// START SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Brew Haven server running on http://localhost:${PORT}`);
});