const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const moment = require('moment');
const config = require('../../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const { tokenTypes } = require('../../config/tokens');

const generateToken = (userId, userRole, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        role: userRole,
        iat:  moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token, 
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false
    });
    if(!tokenDoc){
        throw new Error('Token not found');
    }
    return tokenDoc;
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, user.role, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, user.role, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

const generateResetPasswordToken = async (email) => {
    const user = await userService.getUserByEmail(email);
    if(!user){
        throw new Error('No user found with this email');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPassswordToken = generateToken(user.id, user.role, expires, tokenTypes.RESET_PASSWORD);
    await saveToken(resetPassswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
    return resetPassswordToken;
};

const generateEmailActivationToken = async (email) => {
    const user = await userService.getUserByEmail(email);
    if(!user){
        throw new Error('No user found with this email');
    }
    const expires = moment().add(config.jwt.emailActivationExpirationMinutes, 'minutes');
    const emailActivationToken = generateToken(user.id, user.role, expires, tokenTypes.EMAIL_ACTIVATION);
    await saveToken(emailActivationToken, user.id, expires, tokenTypes.EMAIL_ACTIVATION);
    return emailActivationToken;
}

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateEmailActivationToken,
}