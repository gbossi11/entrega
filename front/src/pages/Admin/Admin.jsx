import { useState, useEffect } from "react";
import { Button, Input, Form, List, Modal, notification } from "antd";
import axios from "axios";
import "../pages.css";

const { TextArea } = Input;

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      notification.error({ message: "Error al cargar productos" });
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleCreate = async (values) => {
    try {
      await axios.post("http://localhost:8080/api/productos", values);
      notification.success({ message: "Producto creado exitosamente" });
      fetchProductos();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creando producto:", error);
      notification.error({ message: "Error al crear producto" });
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/productos/${editingProduct.id}`,
        values
      );
      notification.success({ message: "Producto actualizado exitosamente" });
      fetchProductos();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error actualizando producto:", error);
      notification.error({ message: "Error al actualizar producto" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/productos/${id}`);
      notification.success({ message: "Producto eliminado exitosamente" });
      fetchProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      notification.error({ message: "Error al eliminar producto" });
    }
  };

  const showCreateModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingProduct) {
          handleUpdate(values);
        } else {
          handleCreate(values);
        }
      })
      .catch((error) => console.error("Validation failed:", error));
  };

  return (
    <div className="admin-panel">
      <div className="button-container-admin">
        <Button
          type="primary"
          onClick={showCreateModal}
          className="button-create"
        >
          AGREGAR PRODUCTO
        </Button>
      </div>
      {productos.length > 0 && (
        <List
          className="list-background"
          header={<div className="title-list-products">LISTA DE PRODUCTOS</div>}
          bordered
          dataSource={productos}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => showEditModal(item)}>Editar</Button>,
                <Button onClick={() => handleDelete(item.id)} danger>
                  Eliminar
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div style={{ fontWeight: "bold", color: "white" }}>
                    {item.nombre}
                  </div>
                }
                description={
                  <div className="item-admin">
                    <div style={{ color: "rgb(219, 187, 187)" }}>
                      <b>Descripción:</b> {item.descripcion}
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Precio: ${item.precio}
                    </div>
                    <div style={{ fontWeight: "bold" }}>
                      Stock: {item.stock}
                    </div>
                  </div>
                }
              />
              <img
                src={item.imagen}
                alt={item.nombre}
                style={{ width: 100, height: 100 }}
              />
            </List.Item>
          )}
        />
      )}

      <Modal
        title={editingProduct ? "Editar Producto" : "Agregar Producto"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="imagen" label="URL de Imagen">
            <Input />
          </Form.Item>
          <Form.Item name="precio" label="Precio" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="categoria"
            label="Categoría"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
