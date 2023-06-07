const { Router } = require("express");

//Importar controladores
const {
  getActivities,
  postActivities,
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();
//Solicitud POST a la ruta
activitiesRouter.post("/", postActivities);
//Solicitud GET a la ruta
activitiesRouter.get("/", getActivities);

module.exports = activitiesRouter;
