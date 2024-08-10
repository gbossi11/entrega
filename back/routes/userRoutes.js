const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/firebaseConfig");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Registro de usuario
router.post("/register", async (req, res) => {
  const {
    email,
    password,
    nombre,
    direccion,
    rol = "user",
    telefono,
  } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userSnapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guarda el usuario en la base de datos
    const userRef = db.collection("usuarios").doc();
    await userRef.set({
      email,
      password: hashedPassword,
      nombre,
      direccion,
      rol,
      telefono,
    });

    // CREAR TOKEN
    const token = jwt.sign(
      { id: userRef.id, email, rol },
      process.env.JWT_SECRET || "mi_secreto",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ error: "Error registrando usuario" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSnapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .get();
    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const user = userSnapshot.docs[0].data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: userSnapshot.docs[0].id, email, rol: user.rol },
      process.env.JWT_SECRET || "mi_secreto",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userSnapshot = await db.collection("usuarios").doc(req.user.id).get();
    const userData = userSnapshot.data();
    if (!userData) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
});

module.exports = router;
