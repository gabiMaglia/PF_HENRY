import { useDispatch, useSelector } from "react-redux";
import { fechAllProducts } from "../redux/slices/ProducSlice";
import { useEffect } from "react";

const Prueba = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log(products);

  useEffect(() => {
    dispatch(fechAllProducts());
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <img src={product.images} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Prueba;
