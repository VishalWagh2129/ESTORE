// routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const brandsController = require('../controller/brandsController');
const categoryController = require('../controller/categoryController');
const orderController = require('../controller/orderController');
const productController = require('../controller/productController');
const razorpayController = require('../controller/razorpayController');
const subCategoryController = require('../controller/subcategoryController');
const userController = require('../controller/userController');
const pluginController = require('../controller/PluginController');

router.get('/getAllCustomers', userController.getAllCustomers);
router.get('/getCustomerById/:id', userController.getCustomerById);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/admin-signup', adminController.adminSignup);
router.post('/admin-login', adminController.adminLogin);
router.get('/getAdminDetails/:id', adminController.getAdminDetails);
router.put('/updateAdmin/:id', adminController.updateAdmin);

router.get('/getAllCategories',categoryController.getAllCategories);
router.get('/getAllActiveCategories',categoryController.getAllActiveCategories);
router.post('/savecategory', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.put('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

router.post('/save-subcategory', subCategoryController.createSubCategory);
router.get('/getAllSubCategories', subCategoryController.getAllSubCategories);
router.get('/getSubCategoryById/:id', subCategoryController.getSubCategoryById);
router.put('/update-subcategory/:id', subCategoryController.updateSubCategory);
router.delete('/delete-subcategory/:id', subCategoryController.deleteSubCategory);

router.post('/save-brand',brandsController.createBrand );
router.get('/getAllBrands', brandsController.getAllBrands);
router.get('/getBrandById/:id', brandsController.getBrandById);
router.put('/update-brand/:id', brandsController.updateBrand);
router.delete('/delete-brand/:id', brandsController.deleteBrand);
router.get('/getAllActiveBrands', brandsController.getAllActiveBrands);

router.post('/saveproduct', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

router.post('/add',razorpayController.createOrder);
router.post('/save-payment',razorpayController.savePayment);

router.post('/createOrder', orderController.addOrder);
router.get('/allorders', orderController.allorders);
router.get('/orderproducts', orderController.orderproducts);
router.get('/getAllOrders', orderController.getAllOrders);

//tawk plugin
router.post('/createPlugin', pluginController.createPlugin);
router.get('/getAllPlugins', pluginController.getPlugins);
router.get('/getPluginById/:id', pluginController.getPluginById);
router.put('/updatePlugin/:id', pluginController.updatePlugin);
router.delete('/deletePlugin/:id', pluginController.deletePlugin);

module.exports = router;
