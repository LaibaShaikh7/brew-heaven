import { CartProvider } from "./context/CartContext";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import HotCoffee from "./pages/HotCoffee";
import ColdCoffee from "./pages/ColdCoffee";
import SpecialDrinks from "./pages/SpecialDrinks";
import Desserts from "./pages/Desserts";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OurStory from "./pages/OurStory";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* ================= MENU ================= */}

          <Route
            path="/coffee/hot"
            element={<HotCoffee />}
          />

          <Route
            path="/coffee/cold"
            element={<ColdCoffee />}
          />

          <Route
            path="/special-drinks"
            element={<SpecialDrinks />}
          />

          <Route
            path="/desserts"
            element={<Desserts />}
          />

          {/* ================= ACCOUNT ================= */}

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* ================= SHOPPING ================= */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* ================= OUR STORY ================= */}

          <Route
            path="/our-story"
            element={<OurStory />}
          />

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/coffee/hot"
                replace
              />
            }
          />

          {/* ================= INVALID URL ================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/coffee/hot"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;