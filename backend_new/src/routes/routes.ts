import express from 'express';
import { getAllCustomers,signup,login,getCustomerById } from '../controllers/map.userController';
import { adminLogin,adminSignup,getAdminDetails,updateAdmin } from '../controllers/map.adminController';
import { createCategory,deleteCategory,getAllCategories,getCategoryById,updateCategory,getAllActiveCategories } from '../controllers/map.categoryController';
import { createSubCategory,deleteSubCategory,getAllSubCategories,getSubCategoryById,updateSubCategory } from '../controllers/map.sub-categoryController';
import { createBrand,deleteBrand,getAllActiveBrands,getAllBrands,getBrandById,updateBrand } from '../controllers/map.brandsController';
import { createProduct,deleteProduct,getAllProducts,getProductById,updateProduct } from '../controllers/map.productsController';
import { createOrder,savePayment } from '../controllers/map.razorpay';
import { checkToken } from '../shared/checkToken';
import { addOrder, getAllOrders,allorders,orderproducts } from '../controllers/map.orderController';

const router = express.Router();

router.get('/getAllCustomers', getAllCustomers);
router.get('/getCustomerById/:id', getCustomerById);
router.post('/signup', signup);
router.post('/login', login);
router.post('/admin-signup', adminSignup);
router.post('/admin-login', adminLogin);
router.get('/getAdminDetails/:id', getAdminDetails);
router.put('/updateAdmin/:id', updateAdmin);

router.get('/getAllCategories',getAllCategories);
router.get('/getAllActiveCategories',getAllActiveCategories);
router.post('/savecategory', createCategory);
router.get('/categories', getAllCategories);
router.get('/getCategoryById/:id', getCategoryById);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

router.post('/save-subcategory', createSubCategory);
router.get('/getAllSubCategories', getAllSubCategories);
router.get('/getSubCategoryById/:id', getSubCategoryById);
router.put('/update-subcategory/:id', updateSubCategory);
router.delete('/delete-subcategory/:id', deleteSubCategory);

router.post('/save-brand',createBrand );
router.get('/getAllBrands', getAllBrands);
router.get('/getBrandById/:id', getBrandById);
router.put('/update-brand/:id', updateBrand);
router.delete('/delete-brand/:id', deleteBrand);
router.get('/getAllActiveBrands', getAllActiveBrands);

router.post('/saveproduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

router.post('/add',createOrder);
router.post('/save-payment',savePayment);

router.post('/createOrder', checkToken, addOrder);
router.get('/allorders', checkToken, allorders);
router.get('/orderproducts', checkToken, orderproducts);
router.get('/getAllOrders', getAllOrders);

export default router;
