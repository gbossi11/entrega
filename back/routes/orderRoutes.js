const express = require("express");
const router = express.Router();
const db = require("../config/firebaseConfig");

router.post("/orders", async (req, res) => {
  try {
    const { iduser, total, items } = req.body;

    if (!iduser || !total || !items) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Crear la orden en Firestore
    const orderRef = await db.collection("ordenes").add({
      iduser,
      total,
      fecha: new Date().toISOString(),
      items,
    });

    res.status(201).json({ id: orderRef.id });
  } catch (error) {
    console.error("Error creando la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
});

module.exports = router;
