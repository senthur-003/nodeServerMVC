const knex = require("knex");


const getProductDetails = async (knex) => {
  return await knex.select('*').from('PRODUCTS');
}

const addProduct = async (knex, req) => {
  const discount = req.productPrice * (req.productDiscount / 100)
  const sellingprice = req.productPrice - discount;

  return await knex('PRODUCTS').insert({
    CategoryId :req.productCategory,
    CategoryName:req.categoryName,
    SupplierId :req.supplierId,
    ProductId :req.productSubCategory,
    DesignNo :req.designNo ,
    ProductCode :req.productCode ,
    ProductTitle :req.productTitle,
    ProductDescription :req.productDescription,
    ProductImage :req.productImage ,
    OtherImages :req.otherImages ,
    SellingRate :sellingprice,
    DiscountType :req.discountType,
    DiscountValue :req.productDiscount,
    DiscountAmount :discount,
    MRP :req.productPrice,
    RoundOff :req.roundOff ,
    OfferFrom :req.offerFrom ,
    OfferTo :req.offerTo ,
    IsApproved :req.isApproved ,
    ApprovalLevel :req.ApprovalLevel,
    ApprovalStatus :req.productStatus,
    ApprovalJSON :req.approvalJSON ,
    IsActive :req.productVisibility=='Public'?1:0,
    CreatedBy :req.createdBy ,
    ModifiedBy :req.modifiedBy ,
    SubCategoryId :req.productSubCategory,
    subCategoryName: req.subCategoryName,
    Stocks:req.productStocks,
    shortDescription:req.shortDescription,
    brand:req.productBrand,
    unit:req.productUnit,
    tags:req.productTag,
    exchangeable:req.productExchangeableInput,
    refundable:req.productRefundableInput,
    manufacturer:req.manufacturerName,
    manufacturerBrand:req.manufacturerBrand,
    productSize:req.productSize,
    productColor:String(req.productColour)
  })
}

const removeProduct = async (knex, req) => {
  return await knex('PRODUCT').delete('P_STOCK', 0).del();
}


const getCategory = async (knex) => {
  return await knex.select('*').from('Category').orderBy('order_by', 'asc');
}

const getSubCategory = async (knex, req) => {
  return await knex('SubCategory').where('ParentCategoryId', req.id)
}

const getNavMenu = async (knex) => {
  const parentMenu = await knex.select('*').from('Category').orderBy('order_by', 'asc');
  let _parentMenu=[]
  for (let i = 0; i < parentMenu.length; i++) {
    const subMenu = await knex('SubCategory').where('ParentCategoryId', parentMenu[i].Id);
    let _subMenu = []
    for (let j = 0; j < subMenu.length; j++) {
      _subMenu.push({
        id: subMenu[j].Id,
        label: subMenu[j].CategoryName,
        parentId: parentMenu[i].Id,
        link: '/pages/productgrid',
      })
    }
     _parentMenu .push({
      id: parentMenu[i].Id,
      label: parentMenu[i].CategoryName,
      subItems: _subMenu
    })
  }
  return _parentMenu;
}

const getProduct_byId= async (knex,req)=>{
  if(req.id){
    return await knex('products').where('Id',req.id);
  }
  else if(req.pid){
    return await knex('products').where('ProductId',req.pid);
  }
  else if(req.cid){
    return await knex('products').where('CategoryId',req.cid);
  }
  else if(req.discount){
    let from = req.discount;
    let to = from==50?100:parseInt(from)+9;
    return await knex('products').whereBetween('DiscountValue',[from,to]);
  }
}


const updateProduct = async (knex,req)=>{
  const discount = req.productPrice * (req.productDiscount / 100)
  const sellingprice = req.productPrice - discount;
  return await knex('products').where('Id', req.Id).update({
    CategoryId :req.productCategory,
    CategoryName:req.categoryName,
    SupplierId :req.supplierId,
    ProductId :req.productSubCategory,
    DesignNo :req.designNo ,
    ProductCode :req.productCode ,
    ProductTitle :req.productTitle,
    ProductDescription :req.productDescription,
    ProductImage :req.productImage ,
    OtherImages :req.otherImages ,
    SellingRate :sellingprice,
    DiscountType :req.discountType,
    DiscountValue :req.productDiscount,
    DiscountAmount :discount,
    MRP :req.productPrice,
    RoundOff :req.roundOff ,
    OfferFrom :req.offerFrom ,
    OfferTo :req.offerTo ,
    IsApproved :req.isApproved ,
    ApprovalLevel :req.ApprovalLevel,
    ApprovalStatus :req.productStatus,
    ApprovalJSON :req.approvalJSON ,
    IsActive :req.productVisibility=='Public'?1:0,
    CreatedBy :req.createdBy ,
    ModifiedBy :req.modifiedBy ,
    SubCategoryId :req.productSubCategory,
    subCategoryName: req.subCategoryName,
    Stocks:req.productStocks,
    shortDescription:req.shortDescription,
    brand:req.productBrand,
    unit:req.productUnit,
    tags:req.productTag,
    exchangeable:req.productExchangeableInput,
    refundable:req.productRefundableInput,
    manufacturer:req.manufacturerName,
    manufacturerBrand:req.manufacturerBrand,
    productSize:req.productSize,
    productColor:String(req.productColour)
  })
}

const deleteProduct=  async (knex,req) =>{
  return knex('products').where('Id',req).del();
}

module.exports = { 
  getProductDetails, addProduct, removeProduct, getCategory, getSubCategory, getNavMenu, getProduct_byId, updateProduct,
  deleteProduct
 }
