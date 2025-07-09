import { pool, poolConnect } from '../db.js';

const getProduct = async (req, res) => {
  await poolConnect;
  const category = req.query.category;

  try {
    const request = pool.request();
    let result;

    if (category) {
      request.input('category', category);
      result = await request.query('SELECT * FROM Products WHERE category = @category');
    } else {
      result = await request.query('SELECT * FROM Products');
    }

    res.json(result.recordset);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Database error');
  }
}

export default getProduct;