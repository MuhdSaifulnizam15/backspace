const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const stateSchema = mongoose.Schema({
    state_id: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
});

stateSchema.plugin(toJSON);
stateSchema.plugin(mongoosePaginate);

stateSchema.statics.isNameTaken = async function (name, excludeStateId) {
    const state = await this.findOne({ name, _id: { $ne: excludeStateId } });
    return !!state;
};

stateSchema.statics.isIdTaken = async function (state_id, excludeStateId) {
    const state = await this.findOne({ state_id, _id: { $ne: excludeStateId } });
    return !!state;
};

module.exports = mongoose.model('State', stateSchema);