import { pool } from "../db.js";

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No order items provided." });
  }

  try {
    const request = pool.request();

    const orderResult = await request.input("userId", userId).query(`
        INSERT INTO Orders (user_id) OUTPUT Inserted.id VALUES (@userId)
      `);
    const orderId = orderResult.recordset[0].id;

    for (const item of items) {
      const itemRequest = pool.request();
      await itemRequest
        .input("orderId", orderId)
        .input("productId", item.product_id)
        .input("quantity", item.quantity).query(`
      INSERT INTO OrderItems (order_id, product_id, quantity)
      VALUES (@orderId, @productId, @quantity)
    `);
    }

    res.json({ message: "Order placed successfully.", orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing multi-product order." });
  }
}

export default createOrder;