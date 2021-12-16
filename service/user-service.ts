import {ApiError} from "../exceptions/api-error";
import UserModel from "../models/user-model";
import {UserDataType} from "../type/dataType";
import {SetUserDataType} from "../controllers/user-controller";




class UserService {
    async addUser(name: string) {
        let resultCode = 0
        const messages: Array<string> = []
        if (typeof name !== "string") {
            resultCode = 1
            messages.push(`username:${name} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }
        const candidate = await UserModel.findOne({name})
        if (candidate) throw ApiError.BadRequest(`пользователь с таким name:${name} уже зарегистрирован`,)

        const user = await UserModel.create({name, wishlist: [], shoppingList: []})
        const userDto = user.getUser()
        return {
            resultCode,
            messages,
            data: userDto
        }
    }

    async getUserData(userId: string) {
        let resultCode = 0
        const messages: Array<string> = []
        if (typeof userId !== "string") {
            resultCode = 1
            messages.push(`userId:${userId} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }
        const user = await UserModel.findOne({_id: userId})
        if (!user) throw ApiError.BadRequest(`user with that id:${userId} in not found`)

        const userDto = user.getUser()
        return {
            resultCode,
            messages,
            data: userDto
        }
    }
    async setUserData(data:UserDataType ) {
        let resultCode = 0
        const messages: Array<string> = []

        const user = await UserModel.findOne({_id: data.id})
        if (!user) throw ApiError.BadRequest(`user with that id:${data.id} in not found`)
        const userDto = user.setUser(data)
        await user.save()
        return {
            resultCode,
            messages,
            data: userDto
        }
    }

    async getAllUsers() {
        let resultCode = 0
        const messages: Array<string> = []
        const users = await UserModel.find()
        if (!users) throw ApiError.BadRequest(`users not found`)

        const userDto: Array<any> = []
        users.forEach((user:any) => userDto.push(user.getUser()))
        return {
            resultCode,
            messages,
            data: userDto
        }
    }

    async setUserWishlist(userId:string, productId:string) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
        /* console.log(typeof userID)*/
        let resultCode = 0
        const messages:Array<string> = []
        if (typeof userId !== "string") {
            resultCode = 1
            messages.push(`userId:${userId} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }
        if (typeof productId !== "string") {
            resultCode = 1
            messages.push(`productId:${productId} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }

        const user = await UserModel.findOne({_id: userId})
        if (!user) throw ApiError.BadRequest(`user with that id:${userId} in not found`)
        let wishlist = user.setWish(productId)
        await user.save()
        return {
            resultCode,
            messages,
            data:wishlist
        }
    }

    async setUserPurchase(userId:string, productId:string, isAdd:boolean = true) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
        let resultCode = 0
        const messages:Array<string> = []
        if (typeof userId !== "string") {
            resultCode = 1
            messages.push(`userId:${userId} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }
        if (typeof productId !== "string") {
            resultCode = 1
            messages.push(`productId:${productId} must be a string`)
            return {
                resultCode,
                messages,
                data: null
            }
        }
        const user = await UserModel.findOne({_id: userId})
        if (!user) throw ApiError.BadRequest(`пользователь с таким userID:${userId} не найден`,)
        let shoppingList = user.setPurchase(productId, isAdd)
        await user.save()
        return {
            resultCode,
            messages,
            data:shoppingList
        }
    }
}

export default  new UserService()
