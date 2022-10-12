const Service = require('../services/user.services');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');

module.exports.signup = async (req, res) => {
    try {
        const result = await Service.signupService(req.body);

        res.status(200).json({
            status: "Success",
            message: "Signed up sucessfully.",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to Signup.",
            error: error.message
        })
    }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

module.exports.login = async (req, res) => {
    try {
        // * 1. Check if Email and password are given
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(401).json({
                status: "Failed",
                error: "Please provide your credentials."
            })
        }

        // * 2. Load user with email
        const user = await Service.getUserByEmail(email);
        // * 3. if not user send res
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                error: "No user found! Please create an account."
            })
        };

        console.log(password, user.password);

        // * 4. compare password
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // * 5. if password not correct send res
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Failed",
                error: "Password is incorrect."
            })
        };

        // * 6. check if user is active
        // * 7. if not active send res
        if (user.status != 'active') {
            return res.status(401).json({
                status: "Failed",
                error: "Your account is not active yet."
            })
        };

        // * 8. generate token
        const token = generateToken(user);

        // * 9. send user and token
        const { password: pwd, ...others } = user.toObject();
        res.status(200).json({
            status: "Success",
            user: others,
            token
        })



    } catch (error) {
        res.status(403).json({
            status: "Failed",
            message: "Failed to Login.",
            error: error.message
        })
    }
}

module.exports.getMe = async (req, res) => {
    try {

        const profile = await Service.getMeService(req.user.id);

        res.status(200).json(profile);
    } catch (error) {
        res.status(403).json({
            status: "Failed",
            message: "Failed to get the profile.",
            error: error.message
        })
    }
}


module.exports.getUsers = async (req, res) => {
    try {
        const users = await Service.getUsersService();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the users.",
            error: error.message
        })
    }
}


module.exports.getUserById = async (req, res) => {
    try {
        const user = await Service.getUserByIdService(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the user.",
            error: error.message
        })
    }
}

module.exports.getHiringManagers = async (req, res) => {
    try {
        const managers = await Service.getHiringManagersService();

        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the Manager.",
            error: error.message
        })
    }
}

module.exports.updateUserById = async (req, res) => {
    try {
        const result = await Service.updateUserByIdService(req.params.id, req.body);

        res.status(200).json({
            status: "Success",
            message: "Sucessfully updated the user.",
            result: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get the user.",
            error: error.message
        })
    }
}