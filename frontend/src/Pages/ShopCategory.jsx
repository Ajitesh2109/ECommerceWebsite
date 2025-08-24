import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const [shopCategory, setShopCategory] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products?category=${props.category}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setShopCategory(sorted);
      });
  }, [props.category]);

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{shopCategory.length}</span> out of{" "}
          {shopCategory.length} products
        </p>
      </div>

      <div className="shopcategory-products">
        {shopCategory.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={`/images/${item.image}`}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
