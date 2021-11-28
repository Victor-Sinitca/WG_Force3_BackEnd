const {Schema} = require(`mongoose`)


const OtherProductsScheme = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {
        value: {type: String, require: true},
        currency: {type: String, require: true},
        discount:{type: String, require: true},
    },
    images: {
        big_icon: {type: String, require: true},
        small_icon: {type: String, require: true}
    },
})
module.exports = OtherProductsScheme
