const { Country, Activity } = require("../db");

const getActivities = async (req, res) => {
  try {
    // Obtener todos los registros  de activities de la db
    const allActivities = await Activity.findAll(); // Verificar si no hay actividades registradas
    // Enviar respuesta cod 200 si no hay actividades
    if (!allActivities.length) res.status(200).send("No activities yet");
    // Enviar respuesta cod 200 y todas las actividades en .json
    else res.status(200).json(allActivities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postActivities = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { id, name, difficulty, duration, season, countries } = req.body;
  // Crear nueva actividad en la db con los datos del form
  try {
    const activity = await Activity.create({
      id,
      name,
      difficulty,
      duration,
      season,
    });
    // Buscar el country solicitado en db
    const activitiesToAdd = await Country.findAll({
      where: { name: countries },
    });
    // Asociar los countries encontrados a la actividad creada
    await activity.addCountry(activitiesToAdd);
    // Enviar una respuesta cod 200 y el país
    res.status(200).send("Successful post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getActivities,
  postActivities,
};
