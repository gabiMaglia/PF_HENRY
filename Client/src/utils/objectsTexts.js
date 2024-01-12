//MATERIAL UI
import {
  AccessTimeFilled,
  Room,
  Email,
  Phone,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
} from "@mui/icons-material";

const questionsStore = [
  {
    title: "¿Que garantia tienen los productos?",
    content: [
      "Todos nuestros productos electrónicos cuentan con 180 DÍAS de garantía.",
      "- Productos Samsung, Motorola y LG cuentan con la garantía oficial de 1 (UN) AÑO desde la fecha de compra original.",
      "- Todos los productos tienen 5 días de prueba. En caso de fallas de fábrica, se pueden cambiar directamente en nuestro punto de venta de lunes a viernes en el horario de atención habitual.",
      "- Luego de los 5 días si el producto falla se deberá solicitar la garantía directamente con el fabricante.",
      "- Para que la garantía sea válida el producto no debe ser manipulado por ninguna persona ajena al servicio oficial bajo ninguna circunstancia.",
    ],
  },
  {
    title: "¿Como realizo una compra?",
    content: [
      "Siempre recomendamos comunicarse preferentemente por <a href='https://wa.me/+5491132069043' target='_blank' rel='noopener noreferrer' style='color: #fd611a'>WhatsApp</a> para poder brindar una atención más personalizada.",
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
      "- Mercado Pago",
    ],
  },
  {
    title: "¿Que métodos de envio tienen?",
    content: [
      "Contamos con envios gratis a todo el país para compras superiores a los $50.000",
      "Trabjamos con las siguientes empresas...",
      "- OCA",
      "- Andreani",
      "- Correo Argentino",
      "- Mercado Envíos",
    ],
  },
];

const questionsService = [
  {
    title: "¿Cómo puedo contratar un servicio técnico?",
    content: [
      "Tienes varias maneras de contratar un servicio técnico.",
      "- Desde nuestro <a href='https://wa.me/+5491132069043' target='_blank' rel='noopener noreferrer' style='color: #fd611a'>WhatsApp</a> o haciendo click en el botón flotante.",
      "- Desde nuestra página de <a href='https://pf-henry-sepia.vercel.app/support' target='_blank' rel='noopener noreferrer' style='color: #fd611a'>soporte</a>, completando el formulario.",
      "- Desde nuestras redes sociales.",
      "- Acercandote directamente a nustro local.",
    ],
  },
  {
    title: "¿Como sigo el estado de mi servicio?",
    content: [
      "- Puedes seguir el estado del servicio ingresando con tu usuario y contraseña al sitio y en el panel de usuario dirigirte a Productos en Servicio. Ahí tendras toda la info necesaria sobre el estado de tus productos en servicio",
      "- También recibirás notificaciones del estado de tus servicios via e-mail o <a href='https://wa.me/+5491132069043' target='_blank' rel='noopener noreferrer' style='color: #fd611a'>WhatsApp</a>, dependiendo de la opción que elijas como medio de comunicación al momento de contratar un servicio.",
    ],
  },
  {
    title: "¿Que pasa si quiero cancelar un servicio?",
    content: [
      "Los servicios que ya han sido aceptados NO se pueden cancelar. Es por eso que al momento de contratar un servicio debes leer bien la devolución de nuestros técnicos sobre el diagnóstico del producto y el presupuesto de la reparación.",
      "-Una vez que los técinos reciban el producto, lo revisaran, te enviaran una notificación al medio de comunicación seleccionado y también pódras verlo de tu panel de usuario.",
      "- Ahí tendrás todo detallado y el presupuesto del servicio.",
      "- Tendrás dos botones, uno de ACEPTAR y otro de RECHAZAR.",
      "- Si decides RECHAZAR, nos pondremos en contacto con vos para coordinar día y horario para que pases a retirar el producto.",
      "- Si decides ACEPTAR, se procedera a comenzar con la reparación del mismo y ya no se podrá cancelar el servicio.",
      "- Si de igual manera decides canclear y quieres retirar tu producto, podrás hacerlo, pero deberás abonar el presupuesto que ha sido aceptado inicialmente.",
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
      "- Mercado Pago",
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
      { icon: Phone, text: "+549 11 3206-9043" },
      { icon: Room, text: "Calle Falsa 123 - Buenos Aires" },
      { icon: Email, text: "hypermegared.it@gmail.com" },
      {
        icon: AccessTimeFilled,
        text: "Lu a Vi: 10 a 14hs y 17 a 20hs | Sa: 10 a 14hs.",
      },
    ],
  },
];

const sectionSocial = [
  {
    title: "SEGUINOS EN",
    items: [
      { icon: Facebook, text: "FACEBOOK", link: '#' },
      { icon: Instagram, text: "INSTAGRAM", link: '#'  },
      { icon: YouTube, text: "YOUTUBE", link: '#' },
      { icon: Twitter, text: "TWITTER", link: '#'  },
    ],
  },
];

export {
  questionsStore,
  questionsService,
  textSupport,
  sectionInformation,
  sectionSocial,
};
