const { Router } = require("express");

// Importar todos los routers

const countriesRouter = require("./countriesRouter.js");
const activitiesRouter = require("./activitiesRouter.js");

const router = Router();

// Configurar los routers

router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);

module.exports = router;
