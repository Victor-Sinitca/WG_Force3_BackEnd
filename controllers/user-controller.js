const userService = require(`../service/user-service`)

class UserController {
    async getUserData(req, res, next) {
        try {
            const {id:userId}=req.params
           /* console.log(`id:${userId}`)*/
            const userData = await userService.getUserData(userId)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserData(req, res, next) {
        try {
            const {userID, data}=req.body
           /* console.log(`id:${userID}`)*/
            /*console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await userService.setUserData(userID,data)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserWishlist(req, res, next) {
        try {
            const {userID, data}=req.body
           /* console.log(`id:${userID}`)*/
           /* console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await userService.setUserWishlist(userID,data)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserShopping(req, res, next) {
        try {
            const {userID, data}=req.body
           /* console.log(`id:${userID}`)*/
           /* console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await userService.setUserShopping(userID,data)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()

const data={
    userID:2,
    data:{
        wishlist: [],
        shopping: [],
    }
}