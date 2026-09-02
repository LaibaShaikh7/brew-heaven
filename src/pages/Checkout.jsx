import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();

  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    instructions: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          instructions: formData.instructions,
        },

        items: cart,

        paymentMethod,

        subtotal,

        deliveryFee,

        total,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    console.log("Order saved in MongoDB:", data.order);

    // Clear cart ONLY after successful database save
    clearCart();

    setOrderPlaced(true);

  } catch (error) {
    console.error("Order placement failed:", error);

    alert(
      "Sorry, your order could not be placed. Please make sure the server is running."
    );
  }
};
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#faf7f5] px-5 py-20 text-[#4b3025]">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[32px] bg-white p-10 text-center shadow-sm md:p-16">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8D8CC] text-2xl">
              ✓
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#806052]">
              Order Confirmed
            </p>

            <h1 className="mb-6 font-display text-4xl text-[#4b3025] md:text-5xl">
              Your Brew Haven order is on its way.
            </h1>

            <p className="mx-auto mb-8 max-w-xl leading-7 text-[#6f5a50]">
              Thank you for choosing Brew Haven. Your order has been received
              and will be prepared with care.
            </p>

            <Link
              to="/coffee/hot"
              className="inline-block rounded-full bg-[#5C4033] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:scale-105"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf7f5] px-5 py-20 text-[#4b3025]">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[32px] bg-white p-10 text-center shadow-sm md:p-16">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#806052]">
              Brew Haven
            </p>

            <h1 className="mb-4 font-display text-4xl text-[#4b3025]">
              Your cart is empty
            </h1>

            <p className="mb-8 text-[#6f5a50]">
              Add some coffee or dessert before checking out.
            </p>

            <Link
              to="/coffee/hot"
              className="inline-block rounded-full bg-[#5C4033] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white"
            >
              Explore Coffee
            </Link>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f5] px-5 py-12 text-[#4b3025] md:px-10 md:py-16">

      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}

        <div className="mb-12">

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#806052]">
            Brew Haven
          </p>

          <h1 className="font-display text-5xl text-[#4b3025] md:text-6xl">
            Checkout
          </h1>

          <p className="mt-3 text-[#6f5a50]">
            Complete your order and make it yours.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >

          {/* LEFT SIDE */}

          <div className="space-y-8 lg:col-span-2">

            {/* CUSTOMER INFORMATION */}

            <section className="rounded-[28px] bg-white p-6 shadow-sm md:p-8">

              <div className="mb-7">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#806052]">
                  01
                </p>

                <h2 className="mt-2 font-display text-3xl text-[#4b3025]">
                  Your Information
                </h2>

              </div>


              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />
                </div>

              </div>

            </section>


            {/* DELIVERY ADDRESS */}

            <section className="rounded-[28px] bg-white p-6 shadow-sm md:p-8">

              <div className="mb-7">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#806052]">
                  02
                </p>

                <h2 className="mt-2 font-display text-3xl text-[#4b3025]">
                  Delivery Address
                </h2>

              </div>


              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium">
                    Address
                  </label>

                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Apartment / Street"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium">
                    City
                  </label>

                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />

                </div>


                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium">
                    Delivery Instructions
                    <span className="ml-2 text-xs text-[#9a8980]">
                      Optional
                    </span>
                  </label>

                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Anything we should know about your delivery?"
                    className="w-full resize-none rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none transition focus:border-[#806052]"
                  />

                </div>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="rounded-[28px] bg-white p-6 shadow-sm md:p-8">

              <div className="mb-7">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#806052]">
                  03
                </p>

                <h2 className="mt-2 font-display text-3xl text-[#4b3025]">
                  Payment Method
                </h2>

              </div>


              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* COD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-[#806052] bg-[#faf7f5]"
                      : "border-[#e5d9d2] bg-white"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-bold text-[#4b3025]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-[#806052]">
                        Pay when your order arrives
                      </p>

                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "cod"
                          ? "border-[#806052] bg-[#806052]"
                          : "border-[#cbbdb5]"
                      }`}
                    />

                  </div>

                </button>


                {/* CARD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#806052] bg-[#faf7f5]"
                      : "border-[#e5d9d2] bg-white"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-bold text-[#4b3025]">
                        Card Payment
                      </p>

                      <p className="mt-1 text-sm text-[#806052]">
                        Pay securely by card
                      </p>

                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "card"
                          ? "border-[#806052] bg-[#806052]"
                          : "border-[#cbbdb5]"
                      }`}
                    />

                  </div>

                </button>

              </div>


              {/* CARD DETAILS */}

              {paymentMethod === "card" && (

                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-[#eee4df] pt-6 md:grid-cols-2">

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                      Cardholder Name
                    </label>

                    <input
                      required
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name on card"
                      className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none focus:border-[#806052]"
                    />

                  </div>


                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                      Card Number
                    </label>

                    <input
                      required
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none focus:border-[#806052]"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Expiry Date
                    </label>

                    <input
                      required
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none focus:border-[#806052]"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      CVV
                    </label>

                    <input
                      required
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full rounded-xl border border-[#e5d9d2] bg-[#faf7f5] px-4 py-3 outline-none focus:border-[#806052]"
                    />

                  </div>

                </div>

              )}

            </section>

          </div>


          {/* RIGHT SIDE — ORDER SUMMARY */}

          <div className="lg:col-span-1">

            <div className="sticky top-8 rounded-[28px] bg-white p-6 shadow-sm md:p-8">

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#806052]">
                Your Order
              </p>

              <h2 className="mb-7 font-display text-3xl text-[#4b3025]">
                Order Summary
              </h2>


              {/* ITEMS */}

              <div className="space-y-5">

                {cart.map((item) => (

                  <div
                    key={item.name}
                    className="flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">

                      <p className="font-medium text-[#4b3025]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-[#806052]">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-[#4b3025]">
                      Rs. {(item.price * item.quantity).toFixed(0)}
                    </p>

                  </div>

                ))}

              </div>


              {/* TOTALS */}

              <div className="mt-7 border-t border-[#e8ddd7] pt-6">

                <div className="flex justify-between text-sm text-[#806052]">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(0)}</span>
                </div>

                <div className="mt-3 flex justify-between text-sm text-[#806052]">
                  <span>Delivery</span>
                  <span>Rs. {deliveryFee}</span>
                </div>

                <div className="my-5 border-t border-[#3f302a]" />

                <div className="flex justify-between text-lg font-bold text-[#4b3025]">
                  <span>Total</span>
                  <span>Rs. {total.toFixed(0)}</span>
                </div>

              </div>


              {/* PLACE ORDER */}

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#5C4033] py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:scale-[1.02] hover:bg-[#4a3026]"
              >
                Place Order
              </button>


              <Link
                to="/cart"
                className="mt-4 block text-center text-sm text-[#806052] underline underline-offset-4"
              >
                Back to Cart
              </Link>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}