import {Schema, model, Document} from 'mongoose';
import {ProductSchemaType} from "./provisions-model";
import {nationType, TechniqueDataType, tierType, typeType} from "../type/dataType";


export interface TechniqueSchemaType extends ProductSchemaType {
    filter: {
        nation: nationType,
        type: typeType,
        tier: tierType,
        is_wheeled:boolean
    },
}

export interface TechniqueDocumentType extends TechniqueSchemaType, Document {
    getData: () => TechniqueDataType;
}


const TechniqueScheme: Schema<TechniqueDocumentType> = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    filter: {
        nation: {type: String, require: true},
        type: {type: String, require: true},
        tier: {type: String, require: true},
        is_wheeled: {type: Boolean, default: false}
    },
    price: {
        basic: {
            cost: {type: String, require: true},
            currency: {type: String, default: "$",},
        },
        actual: {
            cost: {type: String, require: true,},
            discountType: {type: String, default: "",},
        },
    },
    images: {
        span_1x1: {type: String, require: true},
        span_2x1: {type: String, default: null},
    },
})
TechniqueScheme.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        filter: {
            nation: this.filter.nation,
            type: this.filter.type,
            tier: this.filter.tier,
            is_wheeled: this.filter.is_wheeled,
        },
        price: {
            basic: {
                cost: this.price.basic.cost,
                currency: this.price.basic.currency,
            },
            actual: {
                cost: this.price.actual.cost,
                discountType: this.price.actual.discountType,
            },
        },
        images: {
            span_1x1: this.images.span_1x1,
            span_2x1: this.images.span_2x1,
        },
    }
};

const TechniqueModel = model<TechniqueDocumentType>("Technique", TechniqueScheme);
export default TechniqueModel;


