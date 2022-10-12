const User = require("../models/user.model");


module.exports.signupService = async (data) => {
    const result = await User.create(data);
    return result;
}

module.exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

module.exports.getMeService = async (id) => {
    const profile = await User.find({ _id: id });
    return profile;
}

module.exports.getUsersService = async () => {
    const users = await User.find({});
    return users;
}

module.exports.getUserByIdService = async (id) => {
    const user = await User.findOne({ _id: id });
    return user;
}

module.exports.getHiringManagersService = async () => {
    const managers = await User.find({ role: 'hiring-manager' });
    return managers;
}


module.exports.updateUserByIdService = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;
}