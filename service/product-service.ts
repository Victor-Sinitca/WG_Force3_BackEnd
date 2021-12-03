import FilterModel from "../models/filter-model";
import GoldModel from "../models/gold-model";
import PremiumModel from "../models/premium-model";
import TechniqueModel, {TechniqueDataType, TechniqueDocumentType, TechniqueSchemaType} from "../models/technique-model";
import ProvisionsModel, {ProductDataType, ProductSchemaType} from "../models/provisions-model";
import {ApiError} from "../exceptions/api-error";
import {FilterType} from "../type/dataType";


const type = ["string", "bigint", "boolean", "number", "object", "symbol", "undefined", "function"]
const product = {
    name: {type: 'string', require: true},
    description: {type: 'string', require: true},
    filter: {
        nation: {type: 'string', require: true},
        type: {type: 'string', require: true},
        tier: {type: 'string', require: true},
    },
    price: {
        basic: {
            cost: {type: 'string', require: true},
            currency: {type: 'string', default: "$",},
        },
        actual: {
            cost: {type: 'string', default: 0,},
            currency: {type: 'string', default: "$",},
        },
    },
    images: {
        span_1x1: {type: 'string', require: true},
        span_2x1: {type: 'string', default: null},
    },
}


class ProductService  {
    async addProduct(productData: ProductSchemaType | TechniqueSchemaType, type: FilterType) {
        let resultCode = 0
        const messages = []
        if (!productData) {
            resultCode = 1
            messages.push("product data not set")
        }
        if (!type || typeof type !== "string") {
            resultCode = 1
            messages.push("type product not set or not string")
        }
        let productDto: TechniqueDataType | ProductDataType | null = null
        if (type === "Technique") {
            const candidate = await TechniqueModel.findOne({name: productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            let product = await TechniqueModel.create(productData)
            productDto = product.getData()
            await FilterModel.create({productId: productDto.id, name: productDto.name, type: type, filter: [type]})
        } else if (type === "Premium") {
            const candidate = await PremiumModel.findOne({name: productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)

            let product = await PremiumModel.create(productData)
            productDto = product.getData()
            await FilterModel.create({productId: productDto.id, name: productDto.name, type: type, filter: [type]})
        } else if (type === "Gold") {
            const candidate = await GoldModel.findOne({name: productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)

            let product = await GoldModel.create(productData)
            productDto = product.getData()
            await FilterModel.create({productId: productDto.id, name: productDto.name, type: type, filter: [type]})
        } else if (type === "Provisions") {
            const candidate = await ProvisionsModel.findOne({name: productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            let product = await ProvisionsModel.create(productData)
            productDto = product.getData()
            await FilterModel.create({productId: productDto.id, name: productDto.name, type: type, filter: [type]})
        } else {
            resultCode = 1
            messages.push(`the type must be one of these strings: Technique Premium Gold Provisions`)
        }
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }

    async getOneProduct(productId: string) {
        let resultCode = 0
        const messages = []
        if (!productId) {
            resultCode = 1
            messages.push("product id not set")
        }
        const product = await FilterModel.findOne({productId: productId}).populate<{ productId: TechniqueDocumentType }>('productId')
        if (!product) {
            throw ApiError.BadRequest(`product with this ID:${productId} is not registered`,)
        }
        const productDto = {
            type: product.type,
            span: product.span,
            data: product.productId.getData()
        }
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }

    async getProductsByList(listProductsId: Array<string> = []) {
        let resultCode = 0
        const messages = []
        if (listProductsId.length === 0) {
            resultCode = 1
            messages.push("array of products id is not set")
        }
        const products = await FilterModel.find({}).where('productId').in(listProductsId).populate<{ productId: TechniqueDocumentType }[]>('productId')
        if (!products || products.length === 0) {
            throw ApiError.BadRequest(`no products found `,)
        }
        const productDto = products.map((p) => {

            return {
                type: p.type,
                span: p.span,
                // @ts-ignore
                data: p.productId.getData()
            }
        })
        //если количество найденых продуктов не равно количеству запрошеных
        if (listProductsId.length !== productDto.length) {
            listProductsId.forEach(productId => {
                let isProductIdFound = false
                productDto.forEach(product => {
                    if (String(productId) === String(product.data.id)) isProductIdFound = true
                })
                if (!isProductIdFound) {
                    messages.push(`product with this ID:${productId} is not found `)
                }
            })
        }
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }

    async getProductsOnFilter(filter:string = "") {
        if (!filter) throw ApiError.BadRequest(`фильтр не установлен`)
        let resultCode = 0
        const messages = []
        let products: Array<any> = []
        if (filter === "All") {
            products = await FilterModel.find({}).sort({priority: -1}).populate<{ productId: TechniqueDocumentType }>('productId')
        } else if (filter === "Technique" || filter === "Premium" || filter === "Gold" || filter === "Provisions") {
            products = await FilterModel.find({}).where('filter').in([filter]).sort({priority: -1}).populate('productId')
        } else {
            resultCode = 1
            messages.push(`filter:${filter} must be "Technique" or "Premium"  or "Gold"  or "Provisions"`)
        }
        /* console.log(products)*/
        const productDto = products.map((p) => {
            return {
                type: p.type,
                span: p.span,
                data: p.productId.getData()
            }
        })
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }
}
export default new ProductService()