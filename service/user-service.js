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


class UserService {
    async getUserData(userId) {
        /*console.log(`userId: ${userId}`)*/
        let resultCode = 0
        const messages = []
        const user = users.filter(value => userId === value.userID)
        /*console.log(`user: ${user}`)*/

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
        /* const users = await UserModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*/
        return {
            resultCode,
            messages,
            data: user[0]
        }
    }
    async setUserData(userID, data) {
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
        /* const users = await UserModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*/
        return {
            resultCode,
            messages,
            data: user[0]
        }
    }
    async setUserWishlist(userID, productID) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
        let isUserFound = false
        let resultCode = 0
        const messages = []
        let wishlist = []
        users.forEach(value => {
            if (value.userID === userID) {
                isUserFound=true
                const length=value.wishlist.length
                value.wishlist = value.wishlist.filter(value => value !== productID)
                if(value.wishlist.length === length) value.wishlist.push(productID)
                wishlist=value.wishlist
            }
        })
        if(!isUserFound){
            resultCode=1
            messages.push("user with this id not found")
        }

        if (resultCode) {
            return {
                resultCode,
                messages,
                data: {
                    wishlist
                }
            }
        }
        /* const users = await UserModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*/
        return {
            resultCode,
            messages,
            data: {
                wishlist
            }
        }
    }
    async setUserShopping(userID, productID) {
        //при передаче невалидного ID может происходить ошибка неостлеживаемого накопления этих ID в базе
        // необходимо выполнять периодическую проверку базы данных на наличие валидных ID
        let isUserFound = false
        let resultCode = 0
        const messages = []
        let shoppingList = []
        users.forEach(value => {
            if (value.userID === userID) {
                isUserFound=true
                const length=value.shopping.length
                value.shopping = value.shopping.filter(value => value !== productID)
                if(value.shopping.length === length) value.shopping.push(productID)
                shoppingList=value.shopping
            }
        })
        if(!isUserFound){
            resultCode=1
            messages.push("user with this id not found")
        }

        if (resultCode) {
            return {
                resultCode,
                messages,
                data: {
                    shoppingList
                }
            }
        }
        /* const users = await UserModel.find()
         return users.map(u=>{
             return new UserDto(u)
         })*/
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
