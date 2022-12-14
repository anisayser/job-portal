const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    const payload = {
        id: userInfo._id,
        customId: userInfo.id,
        email: userInfo.email,
        role: userInfo.role
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "2days"
    });

    return token;
}   