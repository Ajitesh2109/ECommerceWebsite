import express from 'express';
const router = express.Router();
import getProduct from '../Service/productServices.js'

router.get('/', getProduct);

export default router;
