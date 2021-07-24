const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { roles } = require('../../config/roles');
 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            switch(value) {
                case (!value.match(/\d/) && !value.match(/[a-zA-Z]/) && !value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one letter, one special characters and one number');

                case (value.match(/\d/) && !value.match(/[a-zA-Z]/) && !value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one letter and one special characters');

                case (!value.match(/\d/) && value.match(/[a-zA-Z]/) && !value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one number and one special characters');

                case (!value.match(/\d/) && !value.match(/[a-zA-Z]/) && value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one letter and one number');

                case (value.match(/\d/) && value.match(/[a-zA-Z]/) && !value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one special characters');

                case (!value.match(/\d/) && value.match(/[a-zA-Z]/) && value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one number');

                case (value.match(/\d/) && !value.match(/[a-zA-Z]/) && value.match(/[*@!#%&()^~{}]+/)) :
                    throw new Error('Password must contain at least one letter');
            }
        },
        private: true, // used by the toJSON plugin
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'student'
    },
    active: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(mongoosePaginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};
  
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);