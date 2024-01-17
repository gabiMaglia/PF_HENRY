export const dimensions = [
  { label: "" },
  { name: "itemBrand", label: "Marca de productos" },
  { name: "pagePath", label: "Por url" },
  {
    name: "date",
    label: "Por día",
    orderBys: [
      {
        dimension: {
          dimensionName: "date",
          orderType: "ALPHANUMERIC",
        },
      },
    ],
  },
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
  {
    name: "eventName",
    label: "Servicios finalizados",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "finished_service",
          matchType: "EXACT",
        },
      },
    },
  },
];

export const metrics = [
  { label: "" },
  { name: "itemsAddedToCart", label: "Añadidos al carrito" },
  { name: "itemsViewed", label: "Vista al detalle" },
  { name: "screenPageViews", label: "Vistas a la pagina" },
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
  {
    name: "activeUsers",
    label: "Eliminados lista de deseos",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "remove_from_wishlist",
          matchType: "EXACT",
        },
      },
    },
  },
  { name: "eventCount", label: "Total de eventos" },
];
