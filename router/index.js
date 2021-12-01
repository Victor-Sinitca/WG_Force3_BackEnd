const Router = require(`express`).Router
const userController = require(`../controllers/user-controller`)
const productController = require(`../controllers/product-controller`)

const router = new Router()

router.get(`/user`,userController.getUserData)
router.get(`/users`,userController.getAllUsers)

router.get(`/product/filter`,productController.getProductsOnFilter)
router.get(`/product`,productController.getOneProduct)




router.post(`/products`,productController.getProductsByList)

router.post(`/addProducts` , productController.addManyProductsForType)

router.post(`/product` , productController.addProduct)

router.post(`/user/wishlist` , userController.setUserWishlist)
router.post(`/user/purchase` , userController.setUserPurchase)
router.post(`/user` , userController.addUser)

module.exports = router
