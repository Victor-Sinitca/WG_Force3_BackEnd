import {Schema, model, Document} from 'mongoose';
import {ProductDataType, ProductDocumentType, ProductSchemaType} from "./provisions-model";


export interface TechniqueDataType extends ProductDataType{
    filter: {
        nation: string,
        type: string,
        tier: string,
    },
}

export interface TechniqueSchemaType extends ProductSchemaType {
    filter: {
        nation: string,
        type: string,
        tier: string,
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
TechniqueScheme.methods.getData = function (){
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

const TechniqueModel = model<TechniqueDocumentType>("Technique", TechniqueScheme);
export default TechniqueModel;


