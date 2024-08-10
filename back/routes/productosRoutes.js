const express = require("express");
const router = express.Router();
const db = require("../config/firebaseConfig"); // Verifica la ruta aquí

// CREATE
router.post("/productos", async (req, res) => {
  try {
    const { nombre, descripcion, imagen, precio, stock, categoria } = req.body;
    const productoRef = db.collection("productos").doc();
    await productoRef.set({
      nombre,
      descripcion,
      imagen,
      precio,
      stock,
      categoria,
    });
    res.status(201).json({ id: productoRef.id });
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(500).json({ error: "Error creando producto" });
  }
});

// READ
router.get("/productos", async (req, res) => {
  try {
    const productosCollection = db.collection("productos");
    const productosSnapshot = await productosCollection.get();
    const productosList = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(productosList);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: "Error fetching productos" });
  }
});

// UPDATE
router.put("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, imagen, precio, stock, categoria } = req.body;
    const productoRef = db.collection("productos").doc(id);
    await productoRef.update({
      nombre,
      descripcion,
      imagen,
      precio,
      stock,
      categoria,
    });
    res.status(200).json({ message: "Producto actualizado" });
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(500).json({ error: "Error actualizando producto" });
  }
});

// DELETE
router.delete("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("productos").doc(id).delete();
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
    res.status(500).json({ error: "Error eliminando producto" });
  }
});

module.exports = router;
