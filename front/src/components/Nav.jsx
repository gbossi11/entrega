import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Drawer, Button, List, Image, notification, Empty } from "antd";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import "./components.css";

const Nav = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useAuthStore();
  const { cart = [], removeFromCart } = useCartStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleConfirmPurchase = () => {
    if (cart.length === 0) {
      notification.warning({
        message: "Carrito Vacío",
        description:
          "Tu carrito está vacío. Agrega productos antes de proceder.",
        duration: 3,
      });
      return;
    }

    if (user?.rol === "admin") {
      notification.error({
        message: "Acción no permitida",
        description: "Los administradores no pueden realizar pedidos.",
        duration: 3,
      });
      return;
    }

    if (token) {
      setIsDrawerOpen(false);
      setIsCheckoutDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
      navigate("/Login");
      notification.warning({
        message: "Por favor inicie sesión",
        description: "Para completar la compra, debe iniciar sesión.",
        duration: 3,
      });
    }
  };

  const handleFinishPurchase = () => {
    // SIMULACION DE COMPRA. NO LOGRE IMPLEMENTAR CREAR LAS ORDENES EN LA BASE DE DATOS!

    cart.forEach((item) => {
      removeFromCart(item.id);
    });

    notification.success({
      message: "Compra Confirmada",
      description: "Tu compra ha sido realizada con éxito.",
      duration: 3,
    });

    setIsCheckoutDrawerOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">Productos</Link>
        </li>
        <li>
          <Link to="/About">Nosotros</Link>
        </li>
        {user?.rol === "admin" && (
          <li>
            <Link to="/Administrador">Admin</Link>
          </li>
        )}
        {token ? (
          <>
            <li>
              <Link to="/MiCuenta">Mi cuenta</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/Register">Registrarse</Link>
            </li>
          </>
        )}
        <li>
          <Button
            className="carrito"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Carrito ({cart.length})
          </Button>
        </li>
      </ul>

      <Drawer
        title="Carrito de Compras"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <h3 className="titulo-negro-carrito">
          Total de la compra: $
          {cart.reduce((total, item) => total + item.precio * item.quantity, 0)}
        </h3>
        <List
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay productos agregados"
              />
            ),
          }}
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button danger onClick={() => handleRemoveFromCart(item.id)}>
                  Eliminar x1
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Image width={50} src={item.imagen} />}
                title={item.nombre}
                description={
                  <>
                    <p>Precio: ${item.precio}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Total: ${item.precio * item.quantity}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          onClick={handleConfirmPurchase}
          style={{ width: "100%", marginTop: 16 }}
        >
          Confirmar Compra
        </Button>
      </Drawer>

      <Drawer
        title="Confirmar Compra"
        placement="right"
        onClose={() => setIsCheckoutDrawerOpen(false)}
        open={isCheckoutDrawerOpen}
      >
        <div className="checkout-summary">
          <h2 className="titulo-negro-carrito">Resumen de la Compra</h2>
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.nombre}
                  description={`Cantidad: ${item.quantity} x Precio: $${
                    item.precio
                  } = Total: $${item.precio * item.quantity}`}
                />
              </List.Item>
            )}
          />
          <h3 className="titulo-negro-carrito">
            Total a Pagar: $
            {cart.reduce(
              (total, item) => total + item.precio * item.quantity,
              0
            )}
          </h3>
        </div>
        <Button
          type="primary"
          onClick={handleFinishPurchase}
          style={{ width: "100%", marginTop: 16 }}
        >
          Finalizar Compra
        </Button>
      </Drawer>
    </nav>
  );
};

export default Nav;
