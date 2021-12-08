import UserService from "../service/user-service"
import * as express from "express";
import {UserDataType} from "../type/dataType";

type GetUserDataQueryType = {
    id: string
}
type AddProductBodyType = {
    name: string
}
type SetUserWishlistBodyType = {
    userId: string,
    productId: string
}
type SetUserPurchaseBodyType = {
    userId: string,
    productId: string,
    isAdd: boolean
}



export type SetUserDataType = {
    data:UserDataType
}




class UserController {
    async addUser(req: express.Request<{}, {}, AddProductBodyType, {}>, res: express.Response, next: any) {
        try {
            const {name} = req.body
            /*console.log(`addUser - name:${name}`)*/
            const userData = await UserService.addUser(name)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async setUserData(req: express.Request<{}, {}, SetUserDataType, {}>, res: express.Response, next: any) {
        try {
            const {data} = req.body
            /*console.log(`addUser - name:${name}`)*/
            const userData = await UserService.setUserData(data)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUserData(req: express.Request<{}, {}, {}, GetUserDataQueryType>, res: express.Response, next: any) {
        try {
            const {id} = req.query
            /* console.log(`id:${userId}`)*/
            const userData = await UserService.getUserData(id)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req: express.Request, res: express.Response, next: any) {
        try {
            const userData = await UserService.getAllUsers()
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async setUserWishlist(req: express.Request<{}, {}, SetUserWishlistBodyType, {}>, res: express.Response, next: any) {
        try {
            const {userId, productId} = req.body
            /*console.log(`id:${userID}`)*/
            /*console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await UserService.setUserWishlist(userId, productId)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async setUserPurchase(req: express.Request<{}, {}, SetUserPurchaseBodyType, {}>, res: express.Response, next: any) {
        try {
            const {userId, productId, isAdd} = req.body
            /* console.log(`id:${userID}`)*/
            /* console.log(`body:${JSON.stringify(req.body)}`)*/
            const userData = await UserService.setUserPurchase(userId, productId, isAdd)
            await res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}
export default new UserController()



