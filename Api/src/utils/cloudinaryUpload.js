require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const cloudinaryUpdate = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "HYPERMEGARED",
  });

  const { public_id, secure_url } = result;

  console.log(public_id, secure_url);

  return { public_id, secure_url };
};

module.exports = cloudinaryUpdate;
