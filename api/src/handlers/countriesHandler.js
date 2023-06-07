const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

// Solicitud GET > route /countries

const getCountries = async (req, res) => {
  // Extraemos name de la consulta
  const { name } = req.query;
  try {
    // Verificar si el parametro name esta o no presente
    if (!name) {
      // Obtener todos los países de la db e icluir las actividades
      const allCountries = await Country.findAll({
        include: Activity,
      });
      // Enviar una respuesta cod 200 y el array de países
      return res.status(200).json(allCountries);
    } else {
      // Buscar los países que coinciden con el nombre impuesto
      const country = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }, // Que busqueda sea insensible a MAY o min
      });
      // Verificar si no se encontraron países
      if (!country)
        // Enviar respuesta de error cod 404
        return res
          .status(404)
          .json({ error: "Country not found or does not exist" });

      return res.status(200).json(country); // Enviar respuesta cod 200 y el país
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Enviar respuesta de error cod 400 y mensaje de error
  }
};

const getCountriesById = async (req, res) => {
  const { id } = req.params; // Extraer el parámetro id de la solicitud
  try {
    const idCountry = id.toUpperCase(); // Convertir id min > MAY
    const country = await Country.findOne({
      // Buscar país con el ID e icluir las actividades
      where: { id: idCountry },
      include: Activity,
    });
    // Verificarsi se encontró un país
    if (country) return res.status(200).json(country);
    // Enviar una respuesta cod 200 y el país
    else
      return res.status(404).send("There is no country with that identifier"); // Enviar respuesta de error cod 404
  } catch (error) {
    res.status(400).json({ error: error.message }); // Enviar respuesta de error cod 400 y mensaje de error
  }
};

module.exports = {
  getCountries,
  getCountriesById,
};
