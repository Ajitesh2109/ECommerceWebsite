import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, name, image, new_price, old_price, tags, descriptors }) => {
  return (
    <Link
      to={`/product/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="item">
        <img onClick={window.scrollTo(0, 0)} src={image} alt={name} />
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(new_price)}
          </div>
          <div className="item-price-old">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(old_price)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
