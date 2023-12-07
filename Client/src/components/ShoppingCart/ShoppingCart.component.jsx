import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ShoppingCart = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simula la carga de productos desde el archivo JSON local
    import("../../../DataBase/bdd.json")
      .then((data) => setProductos(data.productos))
      .catch((error) => console.error("Error al cargar productos", error));
  }, []);

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>
      <List>
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <ListItem key={producto.id}>
              <ListItemText
                primary={producto.nombre}
                secondary={`Precio: $${producto.precio}`}
              />
              <Button variant="contained" color="primary">
                Agregar al carrito
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">Cargando productos...</Typography>
        )}
      </List>
    </Paper>
  );
};

export default ShoppingCart;
