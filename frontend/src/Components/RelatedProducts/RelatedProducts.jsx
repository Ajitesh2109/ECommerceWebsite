import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.category === category && item.id !== currentProductId
        );
        const randomFour = filtered.sort(() => Math.random() - 0.5).slice(0, 4);
        setRelatedProducts(randomFour);
      });
  }, [category, currentProductId]);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={`/images/${item.image}`}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
