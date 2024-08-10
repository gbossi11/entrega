// src/components/Account.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Alert, Card, Col, Row, Typography } from "antd";
import "../pages.css";

const { Title, Text } = Typography;

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (error) return <Alert message="Error" description={error} type="error" />;
  if (!user) return <div>No se encontró información del usuario.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card bordered={false} style={{ width: "100%", maxWidth: 400 }}>
            <h3 className="titulo-account">
              INFORMACION DE USUARIO ({user.rol})
            </h3>
            <Title level={4}>{user.nombre}</Title>
            <Text strong>Email:</Text> <p>{user.email}</p>
            <Text strong>Dirección:</Text> <p>{user.direccion}</p>
            <Text strong>Teléfono:</Text> <p>{user.telefono}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
