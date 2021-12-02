import { Schema , model} from 'mongoose';


type UserSchemaType={
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}

export type UserDataType={
    id: string,
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}


const UserScheme = new Schema<UserSchemaType>({
    name: {type: String, require: true},
    wishlist: [{type: String, require: true}],
    shoppingList: [{type: String, require: true}],
})

UserScheme.methods.getUser = function ():UserDataType {
    return {
        id: this._id,
        name: this.name,
        wishlist: this.wishlist,
        shoppingList: this.shoppingList,
    }
};
UserScheme.methods.setWish = function (wishId:string):UserDataType {
    const length = this.wishlist.length
    this.wishlist = this.wishlist.filter((value:string) => value !== wishId)
    if(this.wishlist.length === length) this.wishlist.push(wishId)
    return {
        id: this._id,
        name: this.name,
        wishlist: this.wishlist,
        shoppingList: this.shoppingList,
    }
};
UserScheme.methods.setPurchase = function (shoppingId:string, isAdd:boolean):UserDataType {
    const purchaseIsAdd = this.shoppingList.includes(shoppingId)
    if(purchaseIsAdd && !isAdd){
        this.shoppingList = this.shoppingList.filter((value:string) => value !== shoppingId)
    }
    if(!purchaseIsAdd && isAdd){
        this.shoppingList.push(shoppingId)

    }
    return {
        id: this._id,
        name: this.name,
        wishlist: this.wishlist,
        shoppingList: this.shoppingList,
    }
};

module.exports = model("User", UserScheme)

