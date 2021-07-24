const { number } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    product_information: {
        dimensions: {
            type: String,
        },
        weight: {
            type: String,
        },
    },
    description: {
        type: String,
    },
    color: {
        type: String,
    },
    category_id: {
        type: Number,
        required: true
    },
});

productSchema.plugin(toJSON);
productSchema.plugin(mongoosePaginate);

productSchema.statics.isNameTaken = async function (name, excludeProductId) {
    const product = await this.findOne({ name, _id: { $ne: excludeProductId }});
    return !!product;
};

module.exports = mongoose.model('Product', productSchema);