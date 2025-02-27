const knex = require('knex');
const { 
  getProductDetails, addProduct,getCategory, getSubCategory, getNavMenu, getProduct_byId, updateProduct,
  deleteProduct 
} = require('../models/productModel');

const fetchProductList = async (req, res) => {
  try {
    const result = await getProductDetails(req.knex);
    res.sendResponse(200,'Success',{ data: result});
  } catch (err) {
    res.sendResponse(500,err.message);
  }
}

const newProduct = async (req, res) => {
  try {
    await addProduct(req.knex, req.body);
    res.sendResponse(201,'Successfully New Product Added');
  } catch (err) {
    res.sendResponse(500,err.message);
  }
}

const productCategory = async (req, res) => {
  try {
    const result = await getCategory(req.knex);
    res.sendResponse(200,'Success',{ data: result});
  } catch (error) {
    res.sendResponse(500,error.message);
  }
}

const productSubCategory = async (req,res) => {
  try {
    const result = await getSubCategory(req.knex,req.body);
    res.sendResponse(200,'Success',{ data: result});
  } catch (error) {
    res.sendResponse(500,err.message);
  }
}


const getCustNavMenu = async(req,res) => {
  try {
    const CustNavMenu = await getNavMenu(req.knex);
    res.sendResponse(200,'Success',{ data: CustNavMenu});
  } catch (error) {
    res.sendResponse(500,err.message);

  }
}

const fetchProductListId= async(req,res)=>{
  try {
    const product_byId = await getProduct_byId(req.knex,req.body);
    res.sendResponse(200,'Success',{ data: product_byId});
  } catch (error) {
    res.sendResponse(500,error.message);
  }
}

const updateProductById= async (req,res) =>{
  try {
    const result = await updateProduct(req.knex,req.body);
    res.sendResponse(200,'Product details Updated');
  } catch (error) {
    console.log(error);
    res.sendResponse(500,error.message);
  }
}

const deleteProductById= async (req,res)=>{
  const { id } = req.params;
  try {
    const result = await deleteProduct(req.knex,id);
    res.sendResponse(200,'Product Deleted Successfully');
  } catch (error) {
    res.sendResponse(500,error.message)
  }
}

module.exports = { fetchProductList, newProduct, productCategory, productSubCategory, getCustNavMenu, fetchProductListId, 
  updateProductById, deleteProductById
 }