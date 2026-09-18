import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
      instructions: String,
    },

    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: String,
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

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(100);

      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    await connectDB();

    const {
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    } = req.body || {};

    if (!customer || !items?.length) {
      return res.status(400).json({
        message:
          "Customer information and order items are required.",
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

    return res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to save order",
    });
  }
}
