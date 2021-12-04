import ProductService from "../service/product-service"
import * as express from "express";
import {FilterType} from "../type/dataType";
import {TechniqueSchemaType} from "../models/technique-model";

type getProductsByListBodyType={
    listProductsId:Array<string>
}
type AddProductBodyType={
    data: TechniqueSchemaType;
    type: FilterType
}
type getOneProductQueryType={
    id: string
}
type getProductsOnFilterQueryType={
    filter: string
}


class ProductController {
    async addProduct(req: express.Request<{}, {}, AddProductBodyType,{} >, res: express.Response, next:any) {
        try {
            const {data, type} = req.body
            /* console.log(`addProduct  data:${data}`)*/
            const oneProduct = await  ProductService.addProduct(data, type)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getOneProduct(req: express.Request<{}, {}, {}, getOneProductQueryType>, res: express.Response, next:any) {
        try {
            const {id} = req.query
            /* console.log(`id:${userId}`)*/
            const oneProduct = await ProductService.getOneProduct(id)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }
    async getProductsByList(req: express.Request<{}, {}, getProductsByListBodyType, {}>, res: express.Response, next:any) {
        try {
            const {listProductsId} = req.body
            /* console.log(`listProductsId:${listProductsId}`)*/
            const products = await ProductService.getProductsByList(listProductsId)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
    async getProductsOnFilter(req: express.Request<{}, {}, {},getProductsOnFilterQueryType>, res: express.Response, next:any) {
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

