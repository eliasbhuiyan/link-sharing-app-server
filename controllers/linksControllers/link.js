const { default: mongoose } = require("mongoose");
const userScema = require("../../modal/userScema")
const jwt = require("jsonwebtoken");
const addLink = async (req, res) => {
    const { fields } = req.body
    const invalidFields = fields.find(field => !field.url || !field.option)

    if (invalidFields) {
        return res.status(400).send({ error: 'Each field must have a Platform and Link!' })
    }
    if (fields.length === 0) {
        return res.status(400).send({ error: 'You must add at least one link' })
    }

    const invalidUrls = fields.find(field => {
        var result = field.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (result == null)
            return true;
        else
            return false;
    })

    if (invalidUrls) {
        return res.status(400).send({ error: 'The url is invalid!' })
    }

    const sec_token = req.headers.authorization
    const decoded = jwt.verify(sec_token, process.env.JWT_SEC)
    const userId = decoded._id

    const newFields = fields.map(field => ({
        _id: field._id ? field._id : new mongoose.Types.ObjectId(),
        ...field
    }))
    await userScema.findByIdAndUpdate(
        userId,
        {
            $set: {
                links: newFields.map(field => ({
                    _id: field._id,
                    url: field.url,
                    option: field.option,
                }))
            },
        },
        {
            new: true,
            upsert: true,
        }
    )

    const userData = await userScema.aggregate([
        {
            $project: {
                _id: 1,
                email: 1,
                fullName: 1,
                avatar: 1,
                emailVerified: 1,
                links: 1,
            },
        },
    ]);
    res.status(200).send({
        message: "Link updated Successfully!",
        userData,
    })
}

module.exports = { addLink }
