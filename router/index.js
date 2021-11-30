const Router = require(`express`).Router
const userController = require(`../controllers/user-controller`)
const productController = require(`../controllers/product-controller`)

const router = new Router()

// GET /api/user/2
router.get(`/user`,userController.getUserData)
// GET /api/productList?page=10&count=20&filter=all
/*router.get(`/productList`,productController.getProducts)*/
// GET /api/product/5

router.get(`/product/filter`,productController.getProductsOnFilter)
router.get(`/product`,productController.getOneProduct)


router.post(`/products` , productController.addManyProductsForType)
/*router.post(`/products` , productController.addManyProducts)*/
router.post(`/product` , productController.addProduct)
router.post(`/user` , userController.setUserData)
router.post(`/addUser` , userController.addUser)
router.post(`/user/wishlist` , userController.setUserWishlist)
router.post(`/user/shopping` , userController.setUserShopping)


module.exports = router
