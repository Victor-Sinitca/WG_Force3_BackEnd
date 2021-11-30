const productService = require(`../service/product-service`)

class ProductController {
    async addProduct(req, res, next) {
        try {
            const {data, type} = req.body
            /* console.log(`addProduct  data:${data}`)*/
            const oneProduct = await productService.addProduct(data, type)
            await res.json(oneProduct)
        } catch (e) {
            next(e)
        }
    }

    async addManyProducts(req, res, next) {
        try {
            const {data, type} = req.body
            /* console.log(`addProduct  data:${data}`)*/
            const products = data.map(async (d) => {
                return await productService.addProduct(d, type)
            })
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async addManyProductsForType(req, res, next) {
        try {
            const {products_vehicles_0, type , products_gold_0, data} = req.body
            /*console.log(`addManyProductsForType  data:${data}  products_vehicles_0:${products_vehicles_0}  products_gold_0:${products_gold_0} type:${type}`)
 */           const changedData = []
            if (type === "Technique") {
                products_vehicles_0.forEach( (p)=>{
                    changedData.push({
                        name: p.metadata.name,
                        description: p.metadata.description,
                        filter: {
                            nation: p.filter_properties.nation[0],
                            type: p.filter_properties.type[0],
                            tier: p.filter_properties.level[0],
                        },
                        price: {
                            basic: {
                                cost: p.original_price.real_price.amount,
                            },
                            actual: {
                                cost: p.price.real_price.amount,
                            },
                        },
                        images: {
                            span_1x1: p.metadata.grid_1x1_image,
                            span_2x1: p.metadata.grid_2x1_image,
                        },
                    })
                })
            }
            if ( type === "Gold") {
                products_gold_0.forEach( (p)=>{
                    if(p.original_price){
                        changedData.push({
                            name: p.metadata.name,
                            description: p.metadata.description,
                            price: {
                                basic: {
                                    cost: p.original_price.real_price.amount,
                                },
                                actual: {
                                    cost: p.price.real_price.amount,
                                },
                            },
                            images: {
                                span_1x1: p.metadata.grid_1x1_image,
                                span_2x1: p.metadata.grid_2x1_image,
                            },
                        })



                    }

                })
            }
            if (type === "Premium") {
                data.products_game_premium_0.forEach( (p)=>{
                    changedData.push({
                        name: p.metadata.name,
                        description: p.metadata.description,
                        price: {
                            basic: {
                                cost: p.original_price.real_price.amount,
                            },
                            actual: {
                                cost: p.price.real_price.amount,
                            },
                        },
                        images: {
                            span_1x1: p.metadata.grid_1x1_image,
                            span_2x1: p.metadata.grid_2x1_image,
                        },
                    })
                })
                data.products_wg_premium_1.forEach( (p)=>{
                    changedData.push({
                        name: p.metadata.name,
                        description: p.metadata.description,
                        price: {
                            basic: {
                                cost: p.original_price.real_price.amount,
                            },
                            actual: {
                                cost: p.price.real_price.amount,
                            },
                        },
                        images: {
                            span_1x1: p.metadata.grid_1x1_image,
                            span_2x1: p.metadata.grid_2x1_image,
                        },
                    })
                })
                data.products_premium_2.forEach( (p)=>{
                    changedData.push({
                        name: p.metadata.name,
                        description: p.metadata.description,
                        price: {
                            basic: {
                                cost: p.original_price.real_price.amount,
                            },
                            actual: {
                                cost: p.price.real_price.amount,
                            },
                        },
                        images: {
                            span_1x1: p.metadata.grid_1x1_image,
                            span_2x1: p.metadata.grid_2x1_image,
                        },
                    })
                })
            }
            const products = changedData.map(async (d) => {
                return await productService.addProduct(d, type)
            })
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const {id, type} = req.body
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
            const {page, count, filter} = query
            const products = await productService.getProducts(page, count, filter)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getProductsOnFilter(req, res, next) {
        try {
            const {filter} = req.body
            console.log(`getProductsOnFilter filter:${filter}`)
            const products = await productService.getProductsOnFilter(filter)
            await res.json(products)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()
