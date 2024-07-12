const express = require("express");
const auth = require("../middleware/auth");
const Usuario = require("../models/Usuario.js");
const router = express.Router();

router.get("/favoritos", auth, async (req, res) => {
    const usuario = await Usuario.findById(req.user.id);
    res.send(usuario.favoritos);
});

module.exports = router;
