import { Schema ,Document, model} from 'mongoose';

export interface UserDataType{
    id: string,
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}

interface UserSchemaType{
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}
interface UserDocumentType extends UserSchemaType, Document {
    getUser: () => UserDataType;
    setWish: (wishId:string) => UserDataType;
    setPurchase: (shoppingId:string, isAdd:boolean) => UserDataType;
}


const UserScheme: Schema<UserDocumentType> = new Schema<UserSchemaType>({
    name: {type: String, require: true},
    wishlist: [{type: String, require: true}],
    shoppingList: [{type: String, require: true}],
})

UserScheme.methods.getUser = function () {
    return {
        id: this._id,
        name: this.name,
        wishlist: this.wishlist,
        shoppingList: this.shoppingList,
    }
};
UserScheme.methods.setWish = function (wishId:string) {
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
UserScheme.methods.setPurchase = function (shoppingId:string, isAdd:boolean){
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


const UserModel = model<UserDocumentType>('User', UserScheme);
export default UserModel;


