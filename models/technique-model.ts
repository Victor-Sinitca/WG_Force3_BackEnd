import { Schema , model} from 'mongoose';


type TechniqueSchemeType={
    id: string,
    name: string,
    description: string,
    filter: {
        nation: string,
        type: string,
        tier: string
    },
    price: {
        basic: {
            cost: string,
            currency: string,
        },
        actual: {
            cost: string,
            currency: string,
        },
    },
    images: {
        span_1x1: string,
        span_2x1: string,
    },
}


const TechniqueScheme = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    filter: {
        nation: {type: String, require: true},
        type: {type: String, require: true},
        tier: {type: String, require: true},
    },
    price: {
        basic: {
            cost: {type: String, require: true},
            currency: {type: String, default: "$",},
        },
        actual: {
            cost: {type: String, default: 0,},
            currency: {type: String, default: "$",},
        },
    },
    images: {
        span_1x1: {type: String, require: true},
        span_2x1: {type: String, default: null},
    },
})
TechniqueScheme.methods.getData = function ():TechniqueSchemeType {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        filter: {
            nation: this.filter.nation,
            type: this.filter.type,
            tier: this.filter.tier
        },
        price: {
            basic: {
                cost: this.price.basic.cost,
                currency: this.price.basic.currency,
            },
            actual: {
                cost: this.price.actual.cost,
                currency: this.price.actual.currency,
            },
        },
        images: {
            span_1x1: this.images.span_1x1,
            span_2x1: this.images.span_2x1,
        },
    }
};


module.exports = model("Technique", TechniqueScheme)

