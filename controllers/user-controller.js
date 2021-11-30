const userService = require(`../service/user-service`)

class UserController {
    async addUser(req, res, next) {
        try {
            const {name} = req.body
             console.log(`addUser - name:${name}`)
            const userData = await userService.addUser(name)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async getUserData(req, res, next) {
        try {
            const {id:userId}=req.body

           /* console.log(`id:${userId}`)*/
            const userData = await userService.getUserData(userId)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserData(req, res, next) {
        try {
            const {userID, data} = req.body
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
            /*console.log(`id:${userID}`)*/
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


