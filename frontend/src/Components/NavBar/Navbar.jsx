import React, { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
export const Navbar = () => {
  const [menu, setMenu] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const titlePage = () => {
    window.location.href = "/";
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token invalid", err);
        setUser(null);
      }
    }
  }, []);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p onClick={titlePage}>SHOPMART</p>
      </div>
      <ul className="nav-menu" onMouseLeave={() => setMenu("")}>
        <li
          onMouseOver={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop {menu === "shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onMouseOver={() => {
            setMenu("men");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/men">
            Men {menu === "men" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onMouseOver={() => {
            setMenu("women");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/women">
            Women {menu === "women" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onMouseOver={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids {menu === "kids" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <div className="nav-login-box">
          {user ? (
            <div className="nav-login-user">
              <p>Hi, {user.name.split(" ")[0]}</p>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
        <Link to="/cart">
          <img src={cart_icon} alt="" className="cart-icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems() || 0}</div>
      </div>
    </div>
  );
};
