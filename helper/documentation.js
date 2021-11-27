function documentation(req, res, next) {
    try {
        const userData = {
            get: [
                `/api/user/2`,
                "/api/productList?page=10&count=20&filter=all",
                "/api/product/5"
            ],
            post: [
                {
                    path:`/api/user`,
                    data:{
                        userID:"string",
                        data:{
                            wishlist: ["stringID"],
                            shopping: ["stringID"],
                        }
                    }
                } ,
                {
                    path:`/api/user/wishlist`,
                    data:{
                        userID:"string",
                        data:"string_wishlistID"
                    }
                },
                {
                    path:`/api/user/shopping`,
                    data:{
                        userID:"string",
                        data:"string_shoppingID"
                    }
                }
            ],
        }
        res.json(userData)
    } catch (e) {
        next(e)
    }
}

module.exports = documentation