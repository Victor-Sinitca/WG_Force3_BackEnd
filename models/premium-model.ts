import {ProductDocumentType} from "./provisions-model";
import { Schema , model} from 'mongoose';


const PremiumScheme: Schema<ProductDocumentType> = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
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


PremiumScheme.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
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
const PremiumModel = model<ProductDocumentType>("Premium", PremiumScheme);
export default PremiumModel;


