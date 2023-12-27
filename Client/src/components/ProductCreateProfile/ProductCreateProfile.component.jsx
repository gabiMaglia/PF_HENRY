// import { Box, Button, TextField, Grid, Select, MenuItem } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategories } from "../../services/CategoriesServices";
// //MATERIAL UI

// const ProductCreateProfileComponent = () => {
//   //HOOKS
//   const dispatch=useDispatch()
//   const { categories } = useSelector((state) => state.categories);
//   console.log(categories)
//   useEffect(() => {
//      fetchCategories(dispatch);
//   }, [dispatch]);

//   const [categoryName, setCategoryName] = useState('selecciona una categoria');
//    const [values, setValues] = useState({
//     name: "",
//     price: "",
//     description: "",
//     stock: "",
//     categoryName: categoryName,
//     brandName: "",
//     images: [],
//   });

//   const handleChange = (event) => {
//     if (event.target.name === "categoryName") {
//       if (event.target.value !== 'categoria') {
//         setCategoryName(event.target.value);
//       }
//     }
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(values);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           width: "100%",
//           mt: "1.2em",
//         }}
//       >
//         Contenido PRODUCT CREATE (admin)
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 name="name"
//                 label="Nombre del producto"
//                 value={values.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="price"
//                 label="precio del producto($)"
//                 value={values.price}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="description"
//                 label="decripcion del producto"
//                 value={values.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="stock"
//                 label="unidades ingresadas"
//                 value={values.stock}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Select
//                 name="categoryName" 
//                 labelId="categoria del producto"
//                 id="categoria"
//                 label="categoria"
//                 value={categoryName} 
//                 onChange={handleChange} 
//               >
//                 <MenuItem value='selecciona una categoria'>selecciona una categoria</MenuItem>
//                 {categories.map((Category) => {
//                   return (
//                     <MenuItem key={Category.name} value={Category.name}>
//                       {Category.name}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" color="primary" type="submit">
//                 Crear Producto
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default ProductCreateProfileComponent;
import { Box, Button, TextField, Grid, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../services/CategoriesServices";

const ProductCreateProfileComponent = () => {
  //HOOKS
  const dispatch=useDispatch()
  const { categories } = useSelector((state) => state.categories);
  console.log(categories)
  useEffect(() => {
     fetchCategories(dispatch);
  }, [dispatch]);

  const [categoryName, setCategoryName] = useState('selecciona una categoria');
  const [newCategory, setNewCategory] = useState('');
  console.log(newCategory)
  const [dialogOpen, setDialogOpen] = useState(false);

  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryName: categoryName,
    brandName: "",
    images: [],
  });

  const handleChange = (event) => {
    if (event.target.name === "categoryName") {
      if (event.target.value === 'addNew') {
        setDialogOpen(true);
      } else {
        setCategoryName(event.target.value);
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNewCategory = () => {
    setCategoryName(newCategory);
    // Aquí puedes agregar el código para crear la nueva categoría en tu base de datos
    handleDialogClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          mt: "1.2em",
        }}
      >
        Contenido PRODUCT CREATE (admin)
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nombre del producto"
                value={values.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="price"
                label="precio del producto($)"
                value={values.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="decripcion del producto"
                value={values.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="stock"
                label="unidades ingresadas"
                value={values.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                name="categoryName" 
                labelId="categoria del producto"
                id="categoria"
                label="categoria"
                value={categoryName} 
                onChange={handleChange} 
              >
                <MenuItem value='selecciona una categoria'>selecciona una categoria</MenuItem>
                {categories.map((Category) => {
                  return (
                    <MenuItem key={Category.name} value={Category.name}>
                      {Category.name}
                    </MenuItem>
                  );
                })}
                <MenuItem value='addNew'>Agregar nueva categoría</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Crear Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Agregar nueva categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newCategory"
            label="Nombre de la nueva categoría"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleNewCategory} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCreateProfileComponent;