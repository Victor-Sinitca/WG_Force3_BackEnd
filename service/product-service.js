/*const UserModel = require(`../models/user-model`)
const UserDto = require(`../dtos/user-dto`)*/
const ApiError = require(`../exceptions/api-error`)
const TechniqueModel = require(`../models/technique-model`)
const PremiumModel = require(`../models/premium-model`)
const GoldModel = require(`../models/gold-model`)
const ProvisionsModel = require(`../models/provisions-model`)

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
        let product=null
        if(type === "technique"){
            const candidate = await TechniqueModel.findOne({name:productData.name})
            if (candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            }
            product = await TechniqueModel.create(productData)
            const productDto =  product.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "premium"){
            const candidate = await PremiumModel.findOne({name:productData.name})
            if (candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            }
            product = await PremiumModel.create(productData)
            const productDto =  product.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "gold"){
            const candidate = await GoldModel.findOne({name:productData.name})
            if (candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            }
            product = await GoldModel.create(productData)
            const productDto =  product.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "provisions"){
            const candidate = await ProvisionsModel.findOne({name:productData.name})
            if (candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} уже зарегистрирован`,)
            }
            product = await ProvisionsModel.create(productData)
            const productDto =  product.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }

    }

    async getOneProduct(productID, type) {
        let resultCode = 0
        const messages = []
        if (!productID) {
            resultCode = 1
            messages.push("product id not set")
        }
        if (!type) {
            resultCode = 1
            messages.push("product type not set")
        }
        if(type === "technique"){
            const candidate = await TechniqueModel.findOne({_id:productID})
            if (!candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} не зарегистрирован`,)
            }
            const productDto =  candidate.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "premium"){
            const candidate = await PremiumModel.findOne({_id:productID})
            if (!candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} не зарегистрирован`,)
            }
            const productDto =  candidate.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "gold"){
            const candidate = await GoldModel.findOne({_id:productID})
            if (!candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} не зарегистрирован`,)
            }
            const productDto =  candidate.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
        }
        if(type === "provisions"){
            const candidate = await ProvisionsModel.findOne({_id:productID})
            if (!candidate) {
                throw ApiError.BadRequest(`продукт с таким именем:${productData.name} не зарегистрирован`,)
            }
            const productDto =  candidate.getData()
            return {
                resultCode,
                messages,
                data: productDto || null
            }
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
}

module.exports = new ProductService()
