import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsAppComponent = () => {
  const phoneNumber = "+5491132069043";
  const accountName = "Hyper Mega Red";
  const statusMessage = "Tienda Online de Tecnología";
  const chatMessage = "Hola como estas? Envianos un mensaje para poder ayudarte."
  const placeholder = "escribe tu mensaje aquí..."
  const avatar = "https://res.cloudinary.com/hypermegared/image/upload/v1704343728/Recurso_8_uxkd1v.png"

  return (
    <FloatingWhatsApp
      phoneNumber={phoneNumber}
      accountName={accountName}
      statusMessage={statusMessage}
      chatMessage={chatMessage}
      placeholder={placeholder}
      notification={true}
      notificationSound={true}
      allowClickAway={true}
      allowEsc={true}
      avatar={avatar}
    />
  );
};

export default WhatsAppComponent;
