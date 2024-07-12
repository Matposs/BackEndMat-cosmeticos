const express = require("express");
const usuarioController = require('../controllers/usuariosController.js');
const router = express.Router();

router.post("/", usuarioController.createUsuario);
router.post("/registro", usuarioController.registrarUsuario);
router.get("/", usuarioController.getUsuarios);
router.get("/:id", usuarioController.getUsuarioById);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);
router.post("/login", usuarioController.login);

module.exports = router;