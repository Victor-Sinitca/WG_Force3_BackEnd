import ProductService from "../service/product-service"
import {FilterType} from "../type/dataType";
import {TechniqueSchemaType} from "../models/technique-model";



class ProductController {
    async addProduct(req:any, res:any, next:any) {
        try {
            const {data, type}: { data: TechniqueSchemaType; type: FilterType } = req.body
            /* console.log(`addProduct  data:${data}`)*/
            const oneProduct = await  ProductService.addProduct(data, type)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getOneProduct(req:any, res:any, next:any) {
        try {
            const {id} = req.query
            /* console.log(`id:${userId}`)*/
            const oneProduct = await ProductService.getOneProduct(id)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getProductsByList(req:any, res:any, next:any) {
        try {
            const {listProductsId} = req.body
            /* console.log(`listProductsId:${listProductsId}`)*/
            const products = await ProductService.getProductsByList(listProductsId)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
    async getProductsOnFilter(req:any, res:any, next:any) {
        try {
            const {filter} = req.query
            /*console.log(`getProductsOnFilter filter:${filter}`)*/
            const products = await ProductService.getProductsOnFilter(filter)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
}
export default  new ProductController()

