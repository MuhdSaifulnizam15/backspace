const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: {
        type: String,
        required: true
    },
    cityId: {
        type: Number,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    districtId: {
        type: Number,
        required: true
    },
    districtName: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
    mobile_no: {
        type: Number
    },
    default_address: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Address', addressSchema);