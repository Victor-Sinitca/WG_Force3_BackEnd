const {Schema, model} = require(`mongoose`)


const FilterScheme = new Schema({
    productId:{type:Schema.Types.ObjectId,require: true, refPath: 'type'},
    name:{type: String, require: true},
    type: {
        type: String,
        required: true,
        enum: ['Technique', 'Premium', 'Gold','Provisions']
    },
    filter:[{type: String, require: true}],
    priority:{type: Number, min: 0, default:0,},
    span:{type: Number, min: 1, default:1,}
})

FilterScheme.methods.getData = function () {
    return {
        id: this._id,
        type: this.type,
        priority: this.priority,
        filter:this.filter
    }
};


module.exports = model("Filter", FilterScheme)

