const { createProduct, getAllProducts, deleteProduct } = require('../controllers/productController');

const router = require('express').Router();

router.post('/create_product', createProduct);
router.get('/get_products', getAllProducts);
router.delete('/delete/:id', deleteProduct)

module.exports = router;