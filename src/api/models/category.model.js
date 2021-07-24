const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category_id: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
});

categorySchema.plugin(toJSON);
categorySchema.plugin(mongoosePaginate);

categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
    const category = await this.findOne({ name, _id: { $ne: excludeCategoryId }});
    return !!category;
};

categorySchema.statics.isIdTaken = async function (category_id, excludeCategoryId) {
    const category = await this.findOne({ category_id, _id: { $ne: excludeCategoryId } });
    return !!category;
};

module.exports = mongoose.model('Category', categorySchema);