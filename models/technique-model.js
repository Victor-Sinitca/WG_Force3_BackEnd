const {Schema, model} = require(`mongoose`)

const TechniqueScheme = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    nation: {type: String, require: true},
    type: {type: String, require: true},
    tier: {type: String, require: true},
    price: {
        value: {type: String, require: true},
        currency: {type: String, require: true},
        discount:{type: String, require: true},
    },
    images: {
        big_icon: {type: String, require: true},
        contour_icon: {type: String, require: true},
        small_icon: {type: String, require: true}
    },
})
TechniqueScheme.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        nation: this.nation,
        type: this.type,
        tier: this.tier,
        price: {
            value: this.price.value,
            currency: this.price.currency,
            discount:this.price.discount,
        },
        images: {
            big_icon: this.images.big_icon,
            contour_icon: this.images.contour_icon,
            small_icon: this.images.small_icon
        },
    }
};




module.exports = model("Technique", TechniqueScheme)

