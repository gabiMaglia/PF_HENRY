export const dimensions = [
  { label: "" },
  { name: "itemBrand", label: "Marca de productos" },
  { name: "itemCategory", label: "Categoria de productos" },
  { name: "itemName", label: "Producto por nombre" },
  { name: "eventName", label: "Total" },
  {
    name: "eventName",
    label: "Servicios creados",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "create_service",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "eventName",
    label: "Servicios aprovados",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "approve_service",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "eventName",
    label: "Servicios rechazados",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "cancel_service",
          matchType: "EXACT",
        },
      },
    },
  },
];

export const metrics = [
  { label: "" },
  { name: "itemsAddedToCart", label: "Añadidos al carrito" },
  {
    name: "activeUsers",
    label: "Añadidos lista de deseos",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "add_to_wishlist",
          matchType: "EXACT",
        },
      },
    },
  },
  { name: "eventCount", label: "Total de eventos" },
];
