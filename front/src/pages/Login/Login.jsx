import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import useAuthStore from "../../store/useAuthStore";
import "../pages.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      await login(email, password);
      console.log("Inicio de sesión exitoso"); // Verifica que este mensaje se imprima
      notification.success({
        message: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      });
      navigate("/"); // Redirige a la página principal después del login
    } catch (error) {
      console.error("Error en el inicio de sesión:", error); // Imprime el error para depurar
      notification.error({
        message: "Error en el inicio de sesión",
        description:
          error.response?.data?.error ||
          "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          name="email"
          label={<span className="label-white">Email</span>}
          rules={[
            { required: true, type: "email", message: "Introduzca su email." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span className="label-white">Contraseña</span>}
          rules={[{ required: true, message: "Introduzca su contraseña." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-button"
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
