import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const seededRating = (productId) => {
    return ((productId * 37) % 90) + 10;
  };
  const ratingCount = seededRating(product.id);
  return (
    <div className="productdisplay">
      <Link to={`/product/${product.id}`}></Link>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={`/images/${product.image}`} alt="" />
          <img src={`/images/${product.image}`} alt="" />
          <img src={`/images/${product.image}`} alt="" />
          <img src={`/images/${product.image}`} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={`/images/${product.image}`}
            alt=""
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>{ratingCount}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.old_price)}
          </div>
          <div className="productdisplay-right-price-new">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.new_price)}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category : </span>
          {toTitleCase(product.category)}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span>
          {product.tags}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
