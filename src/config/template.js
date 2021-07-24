const resetEmail = (host, resetToken) => {
    const message = {
        subject: 'Reset Password',
        text: 
            `${
                'You are receiving this because you have requested to reset your password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://'
              }${host}/reset-password/${resetToken}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return message;
};

const confirmResetPasswordEmail = () => {
    const message = {
      subject: 'Password Changed',
      text:
        `You are receiving this email because you changed your password. \n\n` +
        `If you did not request this change, please contact us immediately.`
    };
  
    return message;
};

const signupEmail = (host, { resetToken, email }) => {
    const message = {
      subject: 'Account Registration',
      text: `${
        'Please complete your account signup by clicking on the link below. \n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'
      }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
    };
    Merchant
    return message;
};

module.exports = {
    resetEmail,
    confirmResetPasswordEmail,
    signupEmail,
};