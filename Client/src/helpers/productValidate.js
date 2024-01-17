function validarImagen(url) {
   return new Promise((resolve, reject) => {
       const img = new Image();
       img.onload = () => resolve(true);
       img.onerror = () => resolve(false);
       img.src = url;
   });
}

async function validarFormatoImagen(rutaImagen) {
   const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
   let extension = '';
   if (typeof rutaImagen === 'string'){
      const partesRuta =  rutaImagen.split('.');
      extension = '.' + partesRuta[partesRuta.length - 1];
   }else{

      if (  !rutaImagen.name && rutaImagen.includes('http')) {
         const url = new URL(rutaImagen);
         const partesRuta = url.pathname.split('.');
         extension = '.' + partesRuta[partesRuta.length - 1];
      } else {
         const partesRuta =  rutaImagen.name.split('.');
         extension = '.' + partesRuta[partesRuta.length - 1];
      }
      
   }
      if (extensionesValidas.includes(extension.toLowerCase())) {
         await validarImagen(rutaImagen);
         return true;
   } else {
       return false;
   }
}
function esMayuscula(s) {
   if (s && s.charCodeAt(0) >= 65 && s.charCodeAt(0) <= 90) {
       return true;
   } else {
       return false;
   }
}
export const validationsCreate=(values)=>{
   const {name,price,description,images,brandName,categoryName,warranty,stock}=values
   const error={}
   if(name.length===0||name===''){
      error.e1='el nombre del producto es requerido'
   }
   if(price.length===0||price===''){
      error.e2='el precio del producto es requerido'
   }else if(!/^[0-9]*\.?[0-9]*$/.test(price)){
      error.e9='el precio debe tener solamente numeros'
   }
   if(description.length===0||description===''){
      error.e3='la descripcion del producto es requerida'
   }
   if(images.length===0){
      error.e11='Por Favor ingrese una imagen'
   }
   images.forEach(async (image) => {
      const esImagenValida = await validarFormatoImagen(image);
      if (!esImagenValida) {
         error.e4 = 'verifique el formato de sus imagenes';
      }
   });
   if(brandName.length===0||brandName===''||brandName==='Selecciona una marca'){
      error.e5='la marca del producto es requerida'
   }else if(!esMayuscula(brandName)){
      error.e13='la primer letra debe ser mayuscula'
   }
   if(categoryName.length===0||categoryName[0]==="Selecciona una categoria"||categoryName[0]===''||categoryName==="Selecciona una categoria"){
      error.e6='seleccione la categoria de su producto'
   }else if(!esMayuscula(categoryName[0])){
      error.e12='la primer letra debe ser mayuscula'
   }
 if(warranty.length===0||warranty===''){
    error.e7='especifique la garantia del producto'
 }
 if(stock.length===0||stock===''||stock==="0"){
    error.e8='el stock del producto es requerido'
 }else if(!/^[0-9]*\.?[0-9]*$/.test(stock)){
    error.e10='el stock debe tener solamente numeros'
 }
 return error
}


export const validateField = async (fieldName, value) => {
  const error = {};

  switch (fieldName) {
    case "name":
      if (value.length === 0 || value === "") {
        error.e1 = "El nombre del producto es requerido";
      } else if (value.length < 8 || value.length > 100) {
        error.e1 = "El nombre debe tener entre 8 y 100 caracteres";
      }
      break;

    case "price":
      if (value.length === 0 || value === "") {
        error.e2 = "El precio del producto es requerido";
      } else if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
        error.e9 = "El precio debe tener solamente números";
      }
      break;

      case "description":
        if (value.length === 0 || value === "") {
          error.e3 = "La descripción del producto es requerida";
        } else if (value.length <= 10) {
          error.e3 = "La descripción debe tener más de 10 caracteres";
        }
        break;

    case "images":
    case "imageUrl":
      if (value.length === 0) {
        error.e11 = "Por favor, ingrese una imagen";
      } else {
        // Validar cada imagen individualmente
        const invalidImages = await validarFormatoImagen(value);
        if (!invalidImages) {
          error.e4 = "Verifique el formato de sus imágenes";
        }
      }
      break;

    case "brandName":
    case "newBrand":
      if (
        value.length === 0 ||
        value === "" ||
        value === "Selecciona una marca"
      ) {
        error.e5 = "La marca del producto es requerida";
      } else if (!esMayuscula(value)) {
        error.e13 = "La primer letra debe ser mayúscula";
      }
      break;

    case "categoryName":
    case "newCategory":
      if (
        value.length === 0 ||
        value[0] === "Selecciona una categoria" ||
        value[0] === "" ||
        value === "Selecciona una categoria"
      ) {
        error.e6 = "Seleccione la categoria de su producto";
      } else if (!esMayuscula(value[0])) {
        error.e12 = "La primer letra debe ser mayúscula";
      }
      break;

      case "warranty":
        const warrantyRegex = /^(\d+)\s*(meses|años)$/i;
        if (!warrantyRegex.test(value)) {
          error.e7 = "Formato de garantía inválido. Use un número seguido de 'meses' o 'años'.";
        }
        break;
      

    case "stock":
      if (value.length === 0 || value === "" || value === "0") {
        error.e8 = "El stock del producto es requerido";
      } else if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
        error.e10 = "El stock debe tener solamente números";
      }
      break;

    default:
      break;
  }

  return error;
};

