import axios from "axios";
import { useState } from "react";
import { Box, Input, Button } from "@mui/material";
import { handleImageUpload } from "../utils/cloudinaryUpload";

function ImageUploaderComponent() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageInput, setImageInput] = useState("");

  const handleUpload = async (e) => {
    try {
      const imageUrl = await handleImageUpload(e.target.files[0]);
      console.log("URL de la imagen subida:", imageUrl);
      setUploadedImageUrl(imageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleUrlSubmit = async () => {
    try {
      const response = await axios.get(imageInput, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const file = new File([blob], "image_from_url", {
        type: response.headers["content-type"],
      });

      const imageUrl = await handleImageUpload(file);
      console.log("URL de la imagen subida desde URL:", imageUrl);
      setUploadedImageUrl(imageUrl);
      setImageInput("");
    } catch (error) {
      console.error("Error al subir la imagen desde URL:", error);
      console.log("Detalles del error:", error.response.data);
    }
  };

  return (
    <>
      <Box sx={{ padding: "60px" }}>
        <Box>
          <Input type="file" onChange={handleUpload} />
        </Box>
        <Box>
          <Input
            type="text"
            placeholder="Ingrese la URL de la imagen"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <Button onClick={handleUrlSubmit}>Cargar desde URL</Button>
        </Box>
        {uploadedImageUrl && (
          <Box>
            <p>Imagen subida correctamente</p>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ImageUploaderComponent;
