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

   if (!rutaImagen.name && rutaImagen.includes('http')) {
       const url = new URL(rutaImagen);
       const partesRuta = url.pathname.split('.');
       extension = '.' + partesRuta[partesRuta.length - 1];
   } else {
       const partesRuta = rutaImagen.name.split('.');
       extension = '.' + partesRuta[partesRuta.length - 1];
   }

   if (extensionesValidas.includes(extension.toLowerCase())) {
       const esImagenValida = await validarImagen(rutaImagen);
       return esImagenValida;
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
const validationsCreate=(values)=>{
   const {name,price,description,images,brandName,categoryName,warranty,stock}=values
   console.log(categoryName)
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

export default validationsCreate