import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/coffee/hot" className="navbar-logo" onClick={closeMenu}>
          BREW HAVEN
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/coffee/hot">Hot Coffee</Link>
          <Link to="/coffee/cold">Cold Coffee</Link>
          <Link to="/special-drinks">Special Drinks</Link>
          <Link to="/desserts">Desserts</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/cart">Cart 🛒</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link to="/coffee/hot" onClick={closeMenu}>
            ☕ Hot Coffee
          </Link>

          <Link to="/coffee/cold" onClick={closeMenu}>
            🧊 Cold Coffee
          </Link>

          <Link to="/special-drinks" onClick={closeMenu}>
            🥤 Special Drinks
          </Link>

          <Link to="/desserts" onClick={closeMenu}>
            🍰 Desserts
          </Link>

          <Link to="/our-story" onClick={closeMenu}>
            📖 Our Story
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            🛒 Cart
          </Link>

          <Link to="/signup" onClick={closeMenu}>
            👤 Sign Up
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;