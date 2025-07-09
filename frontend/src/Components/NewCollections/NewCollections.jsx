import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 8); // last 8 items
        setNewCollections(shuffled);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.map((item, i) => (
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

export default NewCollections;
