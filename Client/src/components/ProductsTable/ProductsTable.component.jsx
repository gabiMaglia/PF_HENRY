import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlBack = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${urlBack}/product/`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productsWithBrandAndCategory = products.map((product) => {
    const brand =
      product.ProductBrands.length > 0
        ? product.ProductBrands[0].name
        : "Sin marca";
    const category =
      product.ProductCategories.length > 0
        ? product.ProductCategories[0].name
        : "Sin categoría";

    return {
      ...product,
      brand,
      category,
    };
  });

  const columns = [
    // { field: "id", headerName: "ID", minWidth: 70 },
    { field: "name", headerName: "Nombre", width: 350 },
    { field: "price", headerName: "Precio", width: 80 },
    { field: "warranty", headerName: "Garantía", type: "number", width: 100 },
    { field: "soldCount", headerName: "Vendidos", width: 80 },
    { field: "brand", headerName: "Marca", width: 150 },
    { field: "category", headerName: "Categoría", width: 150 },
  ];

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <DataGrid
        rows={productsWithBrandAndCategory}
        columns={columns}
        pageSize={5}
        checkboxSelection
        sx={{ minHeight: "800px", marginTop: "50px", textAlign: "center" }}
      />
    </Box>
  );
};

export default ProductsTable;
