const { createProduct, getAllProducts, deleteProduct, orderProduct, getOrdersbyId } = require('../controllers/productController');

const router = require('express').Router();

router.post('/create_product', createProduct);
router.get('/get_products', getAllProducts);
router.delete('/delete/:id', deleteProduct);
router.post('/place_order', orderProduct);
router.get('/get_orders/:id', getOrdersbyId);

module.exports = router;