export const dimensions = [
  { label: "" },
  { name: "itemBrand", label: "Marca de productos" },
  { name: "pagePath", label: "Por url" },
  {
    name: "searchTerm",
    label: "Por entrada",
  },
  {
    name: "date",
    label: "Por día",
    orderBys: [
      {
        desc: true,
        dimension: {
          dimensionName: "date",
          orderType: "ALPHANUMERIC",
        },
      },
    ],
  },
  {
    name: "month",
    label: "Por mes",
    orderBys: [
      {
        desc: true,
        dimension: {
          dimensionName: "month",
          orderType: "ALPHANUMERIC",
        },
      },
    ],
  },
  {
    name: "year",
    label: "Por año",
    orderBys: [
      {
        desc: true,
        dimension: {
          dimensionName: "year",
          orderType: "ALPHANUMERIC",
        },
      },
    ],
  },
  {
    name: "dayOfWeekName",
    label: "Por dia de la semana",
    orderBys: [
      {
        desc: true,
        dimension: {
          dimensionName: "dayOfWeekName",
          orderType: "ALPHANUMERIC",
        },
      },
    ],
  },
  {
    name: "city",
    label: "Por ciudad",
  },
  {
    name: "country",
    label: "Por pais",
  },
  {
    name: "continent",
    label: "Por continente",
  },
  {
    name: "deviceCategory",
    label: "Por dispositivo",
  },
  {
    name: "plataforma",
    label: "Por plataforma",
  },
  {
    name: "browser",
    label: "Por navegador",
  },
  { name: "itemCategory", label: "Categoria de productos" },
  { name: "itemName", label: "Producto por nombre" },
  { name: "eventName", label: "Total" },
  { name: "method", label: "Metodo" },
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
  {
    name: "activeUsers",
    label: "Eliminados del carrito",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "remove_from_cart",
          matchType: "EXACT",
        },
      },
    },
  },
  { name: "totalUsers", label: "Usuarios" },
  { name: "transactionsPerPurchaser", label: "Transacciónes por usuarios" },
  { name: "userEngagementDuration", label: "Tiempo" },
  { name: "totalRevenue", label: "Ingresos totales" },
  { name: "itemRevenue", label: "Ingresos por compras" },
  {
    name: "activeUsers",
    label: "Articulos vistos desde carousel",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "select_promotion",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Vistas al carrito de compras",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "view_cart",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Click en boton de Whatsapp",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "select_content",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Filtrados y ordenamientos",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "filters_or_sort",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Compras iniciadas",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "begin_checkout",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "eventValue",
    label: "Ingresos por servicios",
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

  {
    name: "activeUsers",
    label: "Ventas exitosas",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "purchase",
          matchType: "EXACT",
        },
      },
    },
  },

  {
    name: "activeUsers",
    label: "Registro de usuarios",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "sign_up",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Inicios de sesión",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "login",
          matchType: "EXACT",
        },
      },
    },
  },
  {
    name: "activeUsers",
    label: "Cierres de sesión",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "sign_out",
          matchType: "EXACT",
        },
      },
    },
  },
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
  {
    name: "eventCount",
    label: "Busquedas en la app",
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "search",
          matchType: "EXACT",
        },
      },
    },
  },
];
