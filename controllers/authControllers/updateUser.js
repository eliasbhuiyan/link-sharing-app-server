const userScema = require("../../modal/userScema");
const { uploadImage } = require("../../utilities/cloudinary");

const updateUser = async (req, res) => {
    const { firstName, lastName, image, mimetype } = req.body;
    const { userId } = req.params;
    try {
        if (!firstName || !lastName) {
            return res.status(400).send({ error: "All fields are required!" });
        }
        if (!image || !mimetype) {
            return res.status(400).send({ error: "Image is required!" });
        }
        if (!userId) {
            return res.status(400).send({ error: "Authorization Failed!" });
        }

        let user = await userScema.findOne({ _id: userId });
        if (user) {
            const imageBuffer = Buffer.from(image, 'base64');
            uploadImage(imageBuffer, mimetype, 'LinkSharingApp/users', async (error, result) => {
                if (result) {
                    user.avatar = result.secure_url;
                    user.fullName = `${firstName} ${lastName}`;
                    await user.save();
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
                    return res.status(200).send({
                        message: "User updated successfully!",
                        userData,
                    });
                }
            })

        } else {
            res.status(400).send({ error: "User not found!" });
        }
    } catch (error) {
        res.status(400).send({ error: "Something went wrong!" });
    }
};
module.exports = updateUser;
