function validarFormatoImagen(rutaImagen) {
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
    let extension = '';

    if (!rutaImagen.name&&rutaImagen.includes('http')) {
        const url = new URL(rutaImagen);
        const partesRuta = url.pathname.split('.');
        extension = '.' + partesRuta[partesRuta.length - 1];
    } else {
        const partesRuta = rutaImagen.name.split('.');
        extension = '.' + partesRuta[partesRuta.length - 1];
    }

    return extensionesValidas.includes(extension.toLowerCase());
}
const validationsCreate=(values)=>{
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
 images.forEach((image)=>{
    if(!validarFormatoImagen(image)){
        error.e4='verifique el formato de sus imagenes'
    }
 })
 if(brandName.length===0||brandName===''){
    error.e5='la marca del producto es requerida'
 }
 if(!categoryName||categoryName==="selecciona una categoria"){
    error.e6='seleccione la categoria de su producto'
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