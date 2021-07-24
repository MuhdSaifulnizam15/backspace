const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    } else if(!user.active){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Account is inactive. Please activate your account by clicking our verification link that has been sent to your email address.');
    }
    return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false
    });
    if(!refreshTokenDoc){
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

/**
 * Reset Password
 * @param {string} resetPassswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserById(resetPasswordTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, { password: newPassword });
        await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
};

const verifyEmail = async (emailVerificationToken) => {
    try {
        /** @TODO check whether account is already activated, for this we need to get the user id. Token is automatically deleted after success match found with user id. */
        const emailVerificationTokenDoc = await tokenService.verifyToken(emailVerificationToken, tokenTypes.EMAIL_ACTIVATION);
        // console.log(emailVerificationTokenDoc);
        const user = await userService.getUserById(emailVerificationTokenDoc.user);
        if(!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, { active: true });
        await Token.deleteMany({ user: user.id, type: tokenTypes.EMAIL_ACTIVATION });
    } catch(error){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to verify your email');
    }
}

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
};