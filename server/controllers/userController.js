const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(400).json(err);
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // plain text match
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        res.status(200).json({ user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = {
    registerUser,
    loginUser
}