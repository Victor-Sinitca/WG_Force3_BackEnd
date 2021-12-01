const Router = require(`express`).Router
const userController = require(`../controllers/user-controller`)
const productController = require(`../controllers/product-controller`)

const router = new Router()

router.get(`/users`,userController.getAllUsers)

router.get(`/user/:id`,userController.getUserData)


router.get(`/product`,productController.getOneProduct)
router.get(`/products`,productController.getProductsByList)



router.post(`/products` , productController.addManyProductsForType)
router.post(`/product/filter`,productController.getProductsOnFilter)

router.post(`/product` , productController.addProduct)

router.post(`/user/wishlist` , userController.setUserWishlist)
router.post(`/user/purchase` , userController.setUserPurchase)
router.post(`/user` , userController.addUser)



module.exports = router
