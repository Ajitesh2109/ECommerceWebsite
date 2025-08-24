import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  if (!cartItems || !all_product || all_product.length === 0) {
    return <div className="loader">Loading cart...</div>;
  }

  const itemsInCart = all_product.filter((e) => (cartItems[e.id] || 0) > 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to place your order.");
      return;
    }

    const items = itemsInCart.map((item) => ({
      product_id: item.id,
      quantity: cartItems[item.id],
    }));

    try {
      const res = await fetch("https://ecommercewebsite-n94k.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        window.location.href = "/";
      } else {
        const data = await res.json();
        alert(`Error placing order: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order, please try again.");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {itemsInCart.length === 0 && <p>Your cart is empty.</p>}

      {itemsInCart.map((e) => (
        <div key={e.id}>
          <div className="cartitems-format cartitems-format-main">
            <img
              src={`/images/${e.image}`}
              alt=""
              className="carticon-product-icon"
            />
            <p>{e.name}</p>
            <p>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(e.new_price)}
            </p>
            <button className="cartitems-quantity">{cartItems[e.id]}</button>
            <p>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(e.new_price * cartItems[e.id])}
            </p>
            <img
              className="cartitems-remove-icon"
              src={remove_icon}
              alt="remove"
              onClick={() => {
                removeFromCart(e.id);
              }}
            />
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  isNaN(getTotalCartAmount()) ? 0 : getTotalCartAmount()
                )}
              </p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  isNaN(getTotalCartAmount()) ? 0 : getTotalCartAmount()
                )}
              </h3>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
