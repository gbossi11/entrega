// src/pages/Register/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, InputNumber } from "antd";
import useAuthStore from "../../store/useAuthStore";
import "../pages.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password, nombre, direccion, telefono } = values;
    await register(email, password, nombre, direccion, telefono);
    setLoading(false);
    navigate("/"); // Redirige a la página principal después del registro
  };

  return (
    <div className="register-container">
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        className="register-form"
      >
        <Form.Item
          name="email"
          label={<span className="label-white">Email</span>}
          rules={[
            {
              required: true,
              type: "email",
              message: "Introduzca un email valido.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span className="label-white">Contraseña</span>}
          rules={[{ required: true, message: "Introduzca una contraseña." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="nombre"
          label={<span className="label-white">Nombre</span>}
          rules={[{ required: true, message: "Introduzca su nombre." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="direccion"
          label={<span className="label-white">Dirección</span>}
          rules={[{ required: true, message: "Introduzca una dirrección." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="telefono"
          label={<span className="label-white">Teléfono</span>}
          rules={[{ required: true, message: "Introduzca un teléfono." }]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="register-button"
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
