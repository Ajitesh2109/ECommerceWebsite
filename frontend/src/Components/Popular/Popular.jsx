import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("https://ecommercewebsite-n94k.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.category === "women");
        setPopularProducts(filtered);
      });
  }, []);

  const randomFour = popularProducts
    .slice(0, 16)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {randomFour.map((item, i) => (
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

export default Popular;
