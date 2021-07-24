const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../../config/tokens');

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [ tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.EMAIL_ACTIVATION ],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

module.exports = mongoose.model('Token', tokenSchema);