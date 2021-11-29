const productService = require(`../service/product-service`)

class ProductController {
    async addProduct(req, res, next) {
        try {
            const {data, type}=req.body
            /* console.log(`addProduct  data:${data}`)*/
            const oneProduct = await productService.addProduct(data, type)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getOneProduct(req, res, next) {
        try {
            const {id, type}=req.body
            /* console.log(`id:${userId}`)*/
            const oneProduct = await productService.getOneProduct(id, type)
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
    async getProductsOnFilter(req, res, next) {
        try {
            const {filter}=req.body
            console.log(`getProductsOnFilter filter:${filter}`)
            const products = await productService.getProductsOnFilter(filter)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()
