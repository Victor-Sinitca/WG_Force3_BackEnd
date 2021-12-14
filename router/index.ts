import * as express from "express";
import userController from "../controllers/user-controller"
import productController from "../controllers/product-controller"

export const router = express.Router()
router.get(`/user`,userController.getUserData)
router.get(`/users`,userController.getAllUsers)

router.get(`/product/filter`,productController.getProductsOnFilter)
router.get(`/product/type`,productController.getProductsOnType)
router.get(`/product`,productController.getOneProduct)




router.post(`/products`,productController.getProductsByList)


router.post(`/addProducts` , productController.addManyProductsForType)
router.post(`/addProductsTech` , productController.addManyProductsTech)

router.post(`/product` , productController.addProduct)

router.post(`/user/wishlist` , userController.setUserWishlist)
router.post(`/user/purchase` , userController.setUserPurchase)
router.post(`/user` , userController.addUser)
router.post(`/userData` , userController.setUserData)


