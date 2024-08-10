import { Button, Image } from "antd";
import useCartStore from "../store/useCartStore"; // Importa el store del carrito
import "./components.css";

const Card = ({ id, nombre, precio, descripcion, imagen }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, nombre, precio, descripcion, imagen });
  };

  return (
    <div className="card-container">
      <h3>{nombre}</h3>
      <Image width={200} src={imagen} alt={nombre} />
      <p>${precio}</p>
      <p>{descripcion}</p>
      <Button type="primary" onClick={handleAddToCart}>
        Agregar
      </Button>
    </div>
  );
};

export default Card;
