const { Router } = require("express");

//Importar controladores
const countriesRouter = Router();
const {
  getCountries,
  getCountriesById,
} = require("../handlers/countriesHandler");

//Solicitud GET a la ruta
countriesRouter.get("/", getCountries);
countriesRouter.get("/:id", getCountriesById);

module.exports = countriesRouter;
