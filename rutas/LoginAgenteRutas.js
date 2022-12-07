const LoginAgenteOperaciones = require("../operaciones/LoginAgenteOperaciones");
const router = require('express').Router();

router.post("/", LoginAgenteOperaciones.admin );

module.exports = router
