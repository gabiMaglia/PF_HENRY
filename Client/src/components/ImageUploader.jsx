import axios from "axios";
import { useState, useRef } from "react";
import { Box, Input, Button, TextareaAutosize } from "@mui/material";
import { handleImageUpload } from "../utils/cloudinaryUpload";

function ImageUploaderComponent() {
  const [uploadedImageUrls, setUploadedUrls] = useState([]);
  const [imageInput, setImageInput] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    try {
      const files = fileInputRef.current.files;

      if (!files) {
        console.error("No se han seleccionado archivos");
        return;
      }

      const newImages = await Promise.all(
        Array.from(files).map((file) => handleImageUpload(file))
      );
      setUploadedUrls((prevUrls) => [...prevUrls, ...newImages]);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleUrlSubmit = async () => {
    try {
      const inputUrls = imageInput
        .split("\n")
        .filter((url) => url.trim() !== "");
      const newImages = await Promise.all(
        inputUrls.map(async (url) => {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const file = new File([blob], "image_from_url", {
            type: response.headers["content-type"],
          });
          return await handleImageUpload(file);
        })
      );
      setUploadedUrls((prevUrls) => [...prevUrls, ...newImages]);
      setImageInput("");
    } catch (error) {
      console.error("Error al subir la imagen desde URL:", error);
      console.log("Detalles del error:", error.response?.data);
    }
  };

  return (
    <>
      <Box sx={{ padding: "60px" }}>
        <Box>
          <Input
            inputProps={{ multiple: true }}
            type="file"
            name="images"
            inputRef={fileInputRef}
          />
          <Button onClick={handleUpload}>Cargar desde archivo</Button>
        </Box>
        <Box>
          <TextareaAutosize
            placeholder="Ingrese las URLs de las imágenes (una por línea)"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          />
          <Button onClick={handleUrlSubmit}>Cargar desde URL</Button>
        </Box>
        {uploadedImageUrls && (
          <Box>
            <p>Imagen subida correctamente</p>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ImageUploaderComponent;
