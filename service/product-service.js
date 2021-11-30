/*const UserModel = require(`../models/user-model`)
const UserDto = require(`../dtos/user-dto`)*/
const ApiError = require(`../exceptions/api-error`)
const TechniqueModel = require(`../models/technique-model`)
const PremiumModel = require(`../models/premium-model`)
const GoldModel = require(`../models/gold-model`)
const ProvisionsModel = require(`../models/provisions-model`)
const FilterModel = require(`../models/filter-model`)


const productData = [
    {
        productDescription: {
            span: "1",
            name: "ИС-64",
            type: "AT-SPG",
            country: "china",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "1",
    },
    {
        productDescription: {
            span: "2",
            name: "ИС-6",
            type: "heavyTank",
            country: "czech",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "2",
    },
    {
        productDescription: {
            span: "2",
            name: "ИС-62",
            type: "lightTank",
            country: "france",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "3",
    },
    {
        productDescription: {
            span: "2",
            name: "ИС-63",
            type: "mediumTank",
            country: "germany",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "4",
    },
    {
        productDescription: {
            span: "2",
            name: "ИС-64",
            type: "SPG",
            country: "italy",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "5",
    },
    {
        productDescription: {
            span: "1",
            name: "ИС-65",
            type: "SPG",
            country: "japan",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "6",
    },
    {
        productDescription: {
            span: "1",
            name: "ИС-66",
            type: "mediumTank",
            country: "poland",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "7",
    },
    {
        productDescription: {
            span: "1",
            name: "ИС-67",
            type: "mediumTank",
            country: "sweden",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "8",
    }
    ,
    {
        productDescription: {
            span: "1",
            name: "ИС-68",
            type: "mediumTank",
            country: "uk",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "9",
    }
    ,
    {
        productDescription: {
            span: "1",
            name: "ИС-69",
            type: "mediumTank",
            country: "usa",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "10",
    }
    ,
    {
        productDescription: {
            span: "1",
            name: "ИС-655",
            type: "mediumTank",
            country: "ussr",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "11",
    }
    ,
    {
        productDescription: {
            span: "1",
            name: "ИС-6",
            type: "mediumTank",
            country: "ussr",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "12",
    }
    ,
    {
        productDescription: {
            span: "1",
            name: "ИС-64",
            type: "mediumTank",
            country: "ussr",
        },
        productImage: "https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png",
        productCost: "$ 58.99",
        productID: "13",
    }
]

function isPositiveInteger(value) {
    return Number.isInteger(+value) && +value >= 0
}




class ProductService {
    async addProduct(productData, type) {
        let resultCode = 0
        const messages = []
        if (!productData) {
            resultCode = 1
            messages.push("product data not set")
        }
        if (!type) {
            resultCode = 1
            messages.push("type product not set")
        }
        let productDto=null
        if(type === "Technique"){
            const candidate = await TechniqueModel.findOne({name:productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            let product = await TechniqueModel.create(productData)
            productDto =  product.getData()
            await FilterModel.create({productId:productDto.id, name:productDto.name, type:type, filter:[type]})
        }
        if(type === "Premium"){
            const candidate = await PremiumModel.findOne({name:productData.name})
            if (candidate)  throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)

            let product = await PremiumModel.create(productData)
            productDto =  product.getData()
            await FilterModel.create({productId:productDto.id, name:productDto.name, type:type, filter:[type]})
        }
        if(type === "Gold"){
            const candidate = await GoldModel.findOne({name:productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)

            let product = await GoldModel.create(productData)
            productDto =  product.getData()
            await FilterModel.create({productId:productDto.id, name:productDto.name, type:type, filter:[type]})
        }
        if(type === "Provisions"){
            const candidate = await ProvisionsModel.findOne({name:productData.name})
            if (candidate) throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            let product = await ProvisionsModel.create(productData)
            productDto =  product.getData()
            await FilterModel.create({productId:productDto.id, name:productDto.name, type:type, filter:[type]})
        }
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }

    async getOneProduct(productID) {
        let resultCode = 0
        const messages = []
        if (!productID) {
            resultCode = 1
            messages.push("product id not set")
        }
        const candidate = await FilterModel.findOne({productId:productID}).populate('productId')
        if (!candidate) {
            throw ApiError.BadRequest(`продукт с таким именем:${productID} не зарегистрирован`,)
        }
        const productDto = {
            type:candidate.type,
            span:candidate.span,
            data:candidate.productId.getData()
        }
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }

    async getProducts(page = "1", count = "10", filter = "") {
        page = +page
        count = +count
        let resultCode = 0
        const messages = []
        if (!isPositiveInteger(page) || !isPositiveInteger(count)) {
            resultCode = 1
            messages.push("page number or page count is invalid")
        }
        if (resultCode) {
            return {
                resultCode,
                messages,
                totalCount: 0,
                data: []
            }
        }
        const filterProducts = productData.filter(value => value)
        let startIndex = count * (page - 1)
        let endIndex = page * count
        const products = []
        /*console.log(`startIndex:${startIndex}  endIndex:${endIndex}`)*/
        for (let i = startIndex; i < endIndex; i++) {
            if (filterProducts[i]) {
                products.push(filterProducts[i])
            }
        }
        /* const users = await productModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*/
        return {
            resultCode,
            messages,
            totalCount: productData.length,
            data: products
        }
    }

    async getProductsOnFilter(filter = []) {
        if (filter.length === 0)  throw ApiError.BadRequest(`фильтр не установлен`)
        let resultCode = 0
        const messages = []
        const products =  await FilterModel.find({}).where('filter').in(filter).sort({ priority: -1 }).populate('productId')
       /* console.log(products)*/
        const productDto = products.map((p)=>{
            return{
                type:p.type,
                span:p.span,
                data:p.productId.getData()
            }
        })
        return {
            resultCode,
            messages,
            data: productDto || null
        }
    }
}

module.exports = new ProductService()
