const { getProductDetails, addProduct,getCategory, getSubCategory, getNavMenu, getProduct_byId } = require('../models/productModel');

const fetchProductList = async (req, res) => {
  try {
    const result = await getProductDetails(req.knex);
    res.status(200).json(
      {
        statuscode: 200,
        message: "Success",
        data: result
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const newProduct = async (req, res) => {
  try {
    await addProduct(req.knex, req.body);
    res.status(201).json(
      {
        statuscode: 201,
        message: "Successfully New Product Added",
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const productCategory = async (req, res) => {
  try {
    const result = await getCategory(req.knex);
    res.status(200).json({
      statuscode:200,
      message:"Success",
      data:result
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const productSubCategory = async (req,res) => {
  try {
    const result = await getSubCategory(req.knex,req.body);
    res.status(200).json({
      statuscode:200,
      message:'Success',
      data:result
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


const getCustNavMenu = async(req,res) => {
  try {
    const CustNavMenu = await getNavMenu(req.knex);
    res.status(200).json({
      statuscode:200,
      data:CustNavMenu
    })
  } catch (error) {
    res.status(500).json(error);
  }
}

const fetchProductListId= async(req,res)=>{
  try {
    const product_byId = await getProduct_byId(req.knex,req.body);
    res.status(200).json({
      statuscode:200,
      data:product_byId
    })
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { fetchProductList, newProduct, productCategory, productSubCategory, getCustNavMenu, fetchProductListId }