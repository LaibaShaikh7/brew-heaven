import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Price({ value }) {
  return <>Rs. {value.toLocaleString("en-PK")}</>;
}

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-primary-container text-on-surface">

        {/* NAVBAR */}

        <nav className="flex h-20 items-center justify-between border-b border-on-surface/10 bg-white/70 px-6 backdrop-blur-xl md:px-16">

          <Link
            to="/coffee/hot"
            className="font-headline-md text-2xl text-primary"
          >
            Brew Haven
          </Link>

          <Link
            to="/coffee/hot"
            className="text-sm text-on-surface-variant hover:text-primary"
          >
            Continue Shopping
          </Link>

        </nav>

        {/* EMPTY CART */}

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <ShoppingBag size={32} />
            </div>

            <h1 className="mt-6 font-headline-lg text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-3 text-on-surface-variant">
              Your next coffee ritual is waiting.
            </p>

            <Link
              to="/coffee/hot"
              className="mt-8 inline-flex rounded-full bg-secondary px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:scale-105"
            >
              Explore Menu
            </Link>

          </div>

        </main>

      </div>
    );
  }

  /* ================= CART WITH ITEMS ================= */

  return (
    <div className="min-h-screen bg-primary-container text-on-surface">

      {/* NAVBAR */}

      <nav className="border-b border-on-surface/10 bg-white/70 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-16">

          <Link
            to="/coffee/hot"
            className="font-headline-md text-2xl text-primary"
          >
            Brew Haven
          </Link>

          <Link
            to="/coffee/hot"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

        </div>

      </nav>

      {/* MAIN */}

      <main className="mx-auto max-w-[1100px] px-5 py-16 md:px-10">

        {/* PAGE TITLE */}

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.25em] text-secondary">
            Your Selection
          </p>

          <h1 className="mt-3 font-headline-lg text-5xl">
            Your Cart
          </h1>

          <p className="mt-3 text-on-surface-variant">
            Review your selected coffee and desserts before checkout.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">

          {/* ================= CART ITEMS ================= */}

          <div className="space-y-5">

            {cart.map((item) => (

              <article
                key={item.name}
                className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
              >

                {/* PRODUCT IMAGE */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 rounded-xl object-cover"
                />

                {/* PRODUCT INFORMATION */}

                <div className="flex flex-1 flex-col justify-between">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h2 className="font-headline-md text-xl">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-on-surface-variant">
                        <Price value={item.price} />
                      </p>

                    </div>

                    {/* DELETE */}

                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-on-surface-variant transition hover:text-red-600"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                  {/* QUANTITY + TOTAL */}

                  <div className="mt-4 flex items-center justify-between">

                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 rounded-full border border-outline/20 px-2 py-1">

                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary/10"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary/10"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    {/* ITEM TOTAL */}

                    <span className="font-semibold text-secondary">
                      <Price
                        value={item.price * item.quantity}
                      />
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <aside className="h-fit rounded-3xl bg-white p-7 shadow-sm">

            <h2 className="font-headline-md text-2xl">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4 text-sm">

              {/* SUBTOTAL */}

              <div className="flex justify-between">

                <span className="text-on-surface-variant">
                  Subtotal
                </span>

                <span>
                  <Price value={subtotal} />
                </span>

              </div>

              {/* DELIVERY */}

              <div className="flex justify-between">

                <span className="text-on-surface-variant">
                  Delivery
                </span>

                <span>
                  <Price value={deliveryFee} />
                </span>

              </div>

              {/* TOTAL */}

              <div className="border-t border-outline/15 pt-4">

                <div className="flex justify-between text-lg font-semibold">

                  <span>Total</span>

                  <span className="text-secondary">
                    <Price value={total} />
                  </span>

                </div>

              </div>

            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="mt-8 block w-full rounded-full bg-[#5C4033] py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition hover:scale-[1.02]"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>

      </main>

    </div>
  );
}