export const dimensions = [
  { name: "itemBrand", label: "Marca" },
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
];

export const metrics = [
  { name: "itemsAddedToCart", label: "Añadidos al carrito" },
  { name: "eventCount", label: "Total de eventos" },
];
