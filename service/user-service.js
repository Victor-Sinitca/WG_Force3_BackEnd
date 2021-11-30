/*const UserModel = require(`../models/user-model`)
const UserDto = require(`../dtos/user-dto`)*/
users = [
    {
        userID: "1",
        wishlist: ["1", "8", "7"],
        shopping: ["2", "6"],
    },
    {
        userID: "2",
        wishlist: ["2", "7"],
        shopping: ["5", "3", "1"],
    },
    {
        userID: "3",
        wishlist: ["4"],
        shopping: ["1", "3"],
    },
    {
        userID: "4",
        wishlist: ["1", "8"],
        shopping: ["5", "10"],
    },
]
const UserModel = require(`../models/user-model`)
const ApiError = require(`../exceptions/api-error`)



class UserService {
    async addUser(name) {
        let resultCode = 0
        const messages = []
        const candidate = await UserModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`пользователь с таким email:${name} уже зарегистрирован`,)
        }
        const user = await UserModel.create({name,wishlist:[],shoppingList:[]})
        const userDto = user.getUser()
        return {
            resultCode,
            messages,
            data: userDto
        }
    }

    async getUserData(userId) {
        let resultCode = 0
        const messages = []
        const user = await UserModel.findOne({_id:userId})
        const userDto=user.getUser()
        return {
            resultCode,
            messages,
            data: userDto
        }
    }

/*    async setUserData(userID, data) {
        let resultCode = 0
        const messages = []
        let user = []
        users.forEach(value => {
            if (value.userID === userID) {
                value.shopping = data.shopping
                value.wishlist = data.wishlist
                user.push(value)
            }
        })
        if (user.length === 0 || user.length > 1) {
            resultCode = 1
            if (user.length === 0) messages.push("user with passed id not found")
            if (user.length > 1) messages.push("there are several user with the same id")
        }
        if (resultCode) {
            return {
                resultCode,
                messages,
                data: {}
            }
        }
        /!* const users = await UserModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*!/
        return {
            resultCode,
            messages,
            data: user[0]
        }
    }*/

    async setUserWishlist(userID, productID) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
       /* console.log(typeof userID)*/
        const user = await UserModel.findOne({_id:userID})
       /* console.log(user)*/
        if (!user) throw ApiError.BadRequest(`пользователь с таким userID:${userID} не найден`,)
        let resultCode = 0
        const messages = []
        let wishlist = user.setWish(productID)
        await user.save()
        return {
            resultCode,
            messages,
            data: {
                wishlist
            }
        }
    }
    async setUserPurchase(userID, productID, isAdd) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
        const user = await UserModel.findOne({_id:userID})
        if (!user) throw ApiError.BadRequest(`пользователь с таким userID:${userID} не найден`,)
        let resultCode = 0
        const messages = []
        let shoppingList = user.setPurchase(productID,isAdd)
        await user.save()
        return {
            resultCode,
            messages,
            data: {
                shoppingList
            }
        }
    }
}

module.exports = new UserService()
