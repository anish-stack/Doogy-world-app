const express = require('express');
const router = express.Router();
const multer = require('multer');
const {CreateProduct,GetAllProducts,GetOnlyHaveProductsWhichIsNotOutStock,GetSingleProduct,ProductByCategories,GetProductsByFilters,deleteAllProducts,deleteProductById,deleteAllProductByCategory,UpdateProductWithImages} = require('../controllers/Products.controller');
const {CreateOfferBanner,UpdateOfferBanner,DeleteOfferBanner,GetAllActiveBanners,DeleteAllBanners,ToggleActiveStatus} = require('../controllers/Banner.controller');
const { getAllVouchers, applyVoucher, createVoucher, activateVoucher, deactivateVoucher, deleteVoucher } = require('../controllers/Vouchers.controller');
// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

//==================== ProductsRoutes ====================
router.post('/Create-Products', upload.array('images'), CreateProduct);
router.get('/Get-All-Products', GetAllProducts);
router.get('/Get-Products-Not-Out-Stock', GetOnlyHaveProductsWhichIsNotOutStock);
router.get('/Get-Single-Product/:id', GetSingleProduct);
router.get('/Products-By-Categories/:category', ProductByCategories);
router.get('/Get-Products-By-Filters', GetProductsByFilters);
router.delete('/Delete-All-Products', deleteAllProducts);
router.delete('/Delete-Product/:id', deleteProductById);
router.delete('/Delete-Products-By-Category/:category', deleteAllProductByCategory);
router.put('/Update-Product/:id', upload.array('images'), UpdateProductWithImages);

//====================Routes For Offer Banner====================

router.post('/Create-Offer-Banner', upload.array('images'), CreateOfferBanner);
router.put('/Update-Offer-Banner/:id', upload.array('image'), UpdateOfferBanner);
router.delete('/Delete-Offer-Banner/:id', DeleteOfferBanner);
router.get('/Get-All-Active-Banners', GetAllActiveBanners);
router.delete('/Delete-All-Banners', DeleteAllBanners);
router.patch('/Toggle-Active-Status/:id', ToggleActiveStatus);


// ====================VOUCHERS====================================//
router.get('/vouchers', getAllVouchers)
router.post('/apply-vouchers', applyVoucher)
router.post('/vouchers/create-vouchers', createVoucher)
router.put('/vouchers/activateVoucher/:id', activateVoucher)
router.put('/vouchers/deactivateVoucher/:id', deactivateVoucher)
router.delete('/vouchers/deleteVoucher/:id', deleteVoucher)








module.exports = router;
