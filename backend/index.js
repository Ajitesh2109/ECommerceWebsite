import express from 'express';
import cors from 'cors';
const app = express();
import productRoutes from './routes/products.js';
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

app.use(express.json())
app.use(cors());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes)
app.use("/api/orders", orderRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
