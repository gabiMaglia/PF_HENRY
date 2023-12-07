import { Box, TextField, Typography } from "@mui/material"
import { textSupport } from "../../utils/objectsTexts"
import Textarea from '@mui/joy/Textarea';

const SupportComponent = () => {

    return (
        <>
            <Box sx={{ backgroundColor: "#000", width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant='h4' sx={{ color: "#fff", textTransform: "uppercase", fontWeight: "800" }}>Soporte</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", margin: "0 auto" }}>
                <Box sx={{ width: "40%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px", margin: "50px" }}>
                    <TextField
                        id="name"
                        label="Nombre"
                        type="string"
                        variant="outlined"
                    />
                    <TextField
                        id="lastName"
                        label="Apellido"
                        type="string"
                        variant="outlined"
                        sx={{ margin: "20px 0" }}
                    />
                    <TextField
                        id="dni"
                        label="DNI"
                        type="string"
                        variant="outlined"
                    />
                    <TextField
                        id="phone"
                        label="Teléfono"
                        type="phone"
                        variant="outlined"
                        sx={{ margin: "20px 0" }}
                    />
                    <TextField
                        id="email"
                        label="Correo Electrónico"
                        type="string"
                        variant="outlined"
                    />
                    <Textarea
                        disabled={false}
                        minRows={4}
                        size="lg"
                        variant="outlined"
                        placeholder="Ejemplo: Tengo un CPU que no enciende. Queda la pantalla negra."
                        sx={{ margin: "20px 0" }}
                    />
                </Box>
                <Box sx={{ width: "40%", display: "flex", justifyContent: "center", padding: "50px", margin: "50px" }}>
                    {textSupport.map((item, index) => (
                        <Box key={index}>
                            <Typography variant='h5' sx={{ marginBottom: "10px", fontWeight: "bold" }}>{item.title}</Typography>
                            {item.content.map((paragraph, pIndex) => (
                                <Typography key={pIndex} sx={{ marginBottom: "10px" }}>
                                    {paragraph.text && <span>{paragraph.text}</span>}
                                    {paragraph.textOne && <span style={{ fontWeight: "bold" }}>{paragraph.textOne}</span>}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default SupportComponent