const cloudinary = require('cloudinary');
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SEC,
    secure: true,
});
const uploadImage = (imageBuffer, mimetype, folderPath, callback) => {
    const base64EncodedData = Buffer.from(imageBuffer).toString('base64');
    const dataURI = `data:${mimetype};base64,${base64EncodedData}`;
    cloudinary.v2.uploader.upload(dataURI, { folder: folderPath }, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};
const deleteImage = (folderPath, imagePath) => {
    try {
        const parts = imagePath.split('/');
        const filenameWithExtension = parts[parts.length - 1];
        const filenameWithoutExtension = filenameWithExtension.split('.')[0];
        cloudinary.uploader.destroy(`${folderPath}${filenameWithoutExtension}`);
    } catch (error) {
        console.error('Error while deleting image:', error);
    }
};
module.exports = { uploadImage, deleteImage }