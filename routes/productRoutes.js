const express = require ('express');
const router = express.Router();
const {fetchProductList,newProduct,productCategory,productSubCategory,getCustNavMenu, fetchProductListId} = require('../controllers/productController');
const verifyToken = require('../token_verification');

router.get('/productList',fetchProductList);
router.post('/add_product',verifyToken,newProduct);
router.get('/product_category',productCategory);
router.post('/get_sub_category',verifyToken,productSubCategory);
router.get('/getCust_NavMenu',getCustNavMenu);
router.post('/productList_byId',fetchProductListId)


module.exports= router;

