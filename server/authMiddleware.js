const User = require("./models/users");

module.exports.userVerification = async (req, res) => {
    try {
        const loggedInUserID = req.cookies.loggedInUser;

        if (!loggedInUserID) {
            return res.json({ status: false });
        }

        const user = await User.findById(loggedInUserID);

        if (user) {
            return res.json({ status: true, user: user.username });
        } else {
            return res.json({ status: false });
        }
    } catch (error) {
        console.error(error);
        return res.json({ status: false });
    }
};
