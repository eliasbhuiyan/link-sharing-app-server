const userScema = require("../../modal/userScema");

const getSingleUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userScema.findById(userId).select("-password -__v");
        if (!user) {
            return res.status(404).send({ error: "User not found!" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong!" });
    }
};

module.exports = { getSingleUser };