const { Router } = require('express');

const ProductController = require('./app/controllers/ProductController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.delete('/products/:id', ProductController.delete);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);

module.exports = router;
