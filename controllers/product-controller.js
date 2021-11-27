const productService = require(`../service/product-service`)

class ProductController {
    async getOneProduct(req, res, next) {
        try {
            const {id:userId}=req.params
            /* console.log(`id:${userId}`)*/
            const oneProduct = await productService.getOneProduct(userId)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getProducts(req, res, next) {
        try {
            const query = req.query
            /*console.log(`getOneProduct query:${JSON.stringify(query)}`)*/
            const {page,count,filter} = query
            const products = await productService.getProducts(page,count,filter)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()
