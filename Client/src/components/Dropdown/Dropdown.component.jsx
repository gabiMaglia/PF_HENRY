import { useState } from 'react';
import { Typography, Box, Collapse, Paper } from '@mui/material';
import { ArrowRight, ArrowDropDown } from "@mui/icons-material"

const DropdownItem = ({ title, content }) => (
    <Box sx={{ paddingBottom: "25px", paddingTop: "10px" }}>
        <Typography>{title}</Typography>
        {content.map((paragraph, index) => (
            <Box key={index} sx={{ padding: "10px", margin: "0 20px" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>{paragraph}</Typography>
            </Box>
        ))}
    </Box>
);

const Dropdown = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const items = [
        {
            title: '¿Que garantia tienen los productos?',
            content: [
                'Todos nuestros productos electrónicos cuentan con 180 DÍAS de garantía.',
                'Productos Samsung, Motorola y Apple cuentan con la garantía oficial de 1 (UN) AÑO desde la fecha de compra original.',
            ],
        },
        {
            title: '¿Como realizo una compra?',
            content: [
                'Siempre recomendamos comunicarse preferentemente por WhatsApp para poder brindar una atención más personalizada.',
                'Igualmente podés realizar la compra de un producto utilizando nuestro CARRITO DE COMPRAS desde esta misma pagina.',
            ],
        },
        {
            title: '¿Cuales son las formas de pago?',
            content: [
                'Aceptamos las siguientes FORMAS DE PAGO:',
                '- Debito/Crédito 1 Pago',
                '- Contado Efectivo',
                '- Transferencia Bancaria',
                '- Tarjetas de Crédito de Banco',
            ],
        },
        {
            title: '¿Que métodos de envio tienen?',
            content: [
                'Contamos con envios gratis a todo el país para compras superiores a los $50.000',
                '- Debito/Crédito 1 Pag',
                '- Contado Efectivo',
                '- Transferencia Bancaria',
                '- Tarjetas de Crédito de Banco',
            ],
        },
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "#000", width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant='h4' sx={{ color: "#fff", textTransform: "uppercase", fontWeight: "800" }}>Preguntas Frecuentes</Typography>
            </Box>
            <Box sx={{ padding: "100px" }}>

                {items.map((item, index) => (
                    <Paper key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "50vw", margin: "15px auto", cursor: "pointer" }}>
                        <Typography variant="h6" onClick={() => handleItemClick(index)} sx={{ display: "flex", alignItems: "center", padding: "20px", fontWeight: "800", textTransform: "uppercase", "&:hover": { color: "#fd611a" }, color: openIndex === index ? "#fd611a" : "", }}>
                            {openIndex === index ? <ArrowDropDown /> : <ArrowRight />} {item.title}
                        </Typography>
                        <Collapse in={openIndex === index}>
                            <DropdownItem content={item.content} />
                        </Collapse>
                    </Paper>
                ))}
            </Box>
        </>
    );
};

export default Dropdown;

