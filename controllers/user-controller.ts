import UserService from "../service/user-service"

class UserController {
    async addUser(req:any, res:any, next:any) {
        try {
            const {name} = req.body
            console.log(`addUser - name:${name}`)
            const userData = await UserService.addUser(name)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async getUserData(req:any, res:any, next:any) {
        try {
            const {id:userId}=req.query

            /* console.log(`id:${userId}`)*/
            const userData = await UserService.getUserData(userId)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async getAllUsers(req:any, res:any, next:any) {
        try {
            const userData = await UserService.getAllUsers()
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
/*    async setUserData(req, res, next) {
        try {
            const {userID, data} = req.body
            /!* console.log(`id:${userID}`)*!/
            /!*console.log(`body:${JSON.stringify(req.body)}`)*!/
            const userData = await userService.setUserData(userID,data)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }*/
    async setUserWishlist(req:any, res:any, next:any) {
        try {
            const {userId, productId}=req.body
            /*console.log(`id:${userID}`)*/
            /*console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await UserService.setUserWishlist(userId,productId)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserPurchase(req:any, res:any, next:any) {
        try {
            const {userId, productId, isAdd}=req.body
            /* console.log(`id:${userID}`)*/
            /* console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await UserService.setUserPurchase(userId,productId,isAdd)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}
export default  new UserController()



