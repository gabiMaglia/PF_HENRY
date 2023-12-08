//MATERIAL UI
import {
  AccessTimeFilled,
  Room,
  Email,
  Phone,
  Inventory,
  SupportAgent,
  Help,
  Language,
} from "@mui/icons-material";

//HELPERS
import PATHROUTE from "../helpers/pathRoute";

const itemsQuestions = [
  {
    title: "¿Que garantia tienen los productos?",
    content: [
      "Todos nuestros productos electrónicos cuentan con 180 DÍAS de garantía.",
      "Productos Samsung, Motorola y Apple cuentan con la garantía oficial de 1 (UN) AÑO desde la fecha de compra original.",
    ],
  },
  {
    title: "¿Como realizo una compra?",
    content: [
      "Siempre recomendamos comunicarse preferentemente por WhatsApp para poder brindar una atención más personalizada.",
      "Igualmente podés realizar la compra de un producto utilizando nuestro CARRITO DE COMPRAS desde esta misma pagina.",
    ],
  },
  {
    title: "¿Cuales son las formas de pago?",
    content: [
      "Aceptamos las siguientes FORMAS DE PAGO:",
      "- Debito/Crédito 1 Pago",
      "- Contado Efectivo",
      "- Transferencia Bancaria",
      "- Tarjetas de Crédito de Banco",
    ],
  },
  {
    title: "¿Que métodos de envio tienen?",
    content: [
      "Contamos con envios gratis a todo el país para compras superiores a los $50.000",
      "- Debito/Crédito 1 Pag",
      "- Contado Efectivo",
      "- Transferencia Bancaria",
      "- Tarjetas de Crédito de Banco",
    ],
  },
];

const textSupport = [
  {
    title: "Bienvenido al Soporte Técnico de Hyper Mega Red",
    content: [
      {
        text: "Entendemos lo crucial que es contar con un soporte técnico eficiente y rápido para resolver cualquier inconveniente que puedas tener con los productos de informática. Nuestro equipo de expertos está aquí para ayudarte. A continuación, te proporcionamos información clave para facilitar el proceso de asistencia técnica:",
      },
      {
        textOne: "1. Base de Conocimientos:",
      },
      {
        text: "Si no encuentras la solución que buscas en nuestra base de conocimientos, te animamos a completar nuestro formulario de soporte técnico. Proporcióntanos detalles específicos sobre el problema que estás experimentando, y nuestro equipo técnico se pondrá en contacto contigo en el menor tiempo posible.",
      },
      {
        textOne: "2. Formulario de Soporte Técnico:",
      },
      {
        text: "Antes de ponerte en contacto con nuestro equipo, te recomendamos explorar nuestra completa base de conocimientos. Allí encontrarás artículos, tutoriales y respuestas a preguntas frecuentes que pueden resolver tu problema de manera inmediata. Visita nuestra sección de 'Preguntas Frecuentes' para obtener respuestas rápidas.",
      },
      {
        textOne: "3. Atención Telefónica:",
      },
      {
        text: "Si prefieres hablar directamente con uno de nuestros expertos, nuestro equipo de soporte técnico también está disponible por teléfono. Consulta nuestros números de contacto al pie de la página para comunicarte con nosotros.",
      },
    ],
  },
];

const sectionInformation = [
  {
    title: "INFORMACION",
    items: [
      { icon: Phone, text: "+54 11 2256-8888" },
      { icon: Room, text: "Calle Falsa 123 - Buenos Aires" },
      { icon: Email, text: "contacto@hypermegared.com.ar" },
      {
        icon: AccessTimeFilled,
        text: "Lunes a Viernes: 10 a 14hs y 17 a 20hs | Sábados: 10 a 14hs.",
      },
    ],
  },
];

const sectionPages = [
  {
    title: "PAGINAS",
    items: [
      { icon: Language, text: "INICIO", link: PATHROUTE.HOME },
      { icon: Inventory, text: "PRODUCTOS", link: PATHROUTE.PRODUCTS },
      { icon: SupportAgent, text: "SOPORTE", link: PATHROUTE.SUPPORT },
      { icon: Help, text: "PREGUNTAS FRECUENTES", link: PATHROUTE.QUESTIONS },
    ],
  },
];

export { itemsQuestions, textSupport, sectionInformation, sectionPages };
