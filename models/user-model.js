const {Schema, model} = require(`mongoose`)


const UserScheme = new Schema({
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
UserScheme.methods.setWish = function (wishId) {
    const length = this.wishlist.length
    this.wishlist = this.wishlist.filter(value => value !== wishId)
    if(this.wishlist.length === length) this.wishlist.push(wishId)
    return  this.wishlist
};
UserScheme.methods.setShopping = function (shoppingId) {
    const length=this.shoppingList.length
    this.shoppingList = this.shoppingList.filter(value => value !== shoppingId)
    if(this.shoppingList.length === length) this.shoppingList.push(shoppingId)
    return this.shoppingList
};

module.exports = model("User", UserScheme)

