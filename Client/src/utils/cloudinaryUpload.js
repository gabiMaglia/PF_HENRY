import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

const handleImageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    );

    if (!response.data.secure_url) {
      throw new Error("Error al subir la imagen a Cloudinary");
    }

    return response.data.secure_url;
  } catch (error) {
    console.error("Error en la subida de la imagen:", error);
    throw error;
  }
};

export { cloudinary, handleImageUpload };
