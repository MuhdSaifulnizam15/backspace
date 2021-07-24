const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const citySchema = mongoose.Schema({
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

citySchema.plugin(toJSON);

citySchema.statics.isNameTaken = async function (name, excludeCityId) {
    const city = await this.findOne({ name, _id: { $ne: excludeCityId }});
    return !!city;
};

module.exports = mongoose.model('City', citySchema);