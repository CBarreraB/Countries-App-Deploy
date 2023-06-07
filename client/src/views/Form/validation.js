export const validate = (data) => {
  const regexName = /^[a-zA-Z\s]+$/;
  let errors = {};

  // Verificar Name
  if (!data.name) {
    errors.name = "Name activity required";
  } else if (data.name.length > 16) {
    errors.name = "Name too long - Please shorten it";
  } else if (!regexName.test(data.name)) {
    errors.name = "You can only use Letters";
  }

  // Verificar datos completados
  if (data.difficulty === 0) errors.difficulty = "Choose difficulty";
  if (data.duration === 0) errors.duration = "Choose duration";
  if (data.season === "") errors.season = "Choose a season";

  // Verificar seleccion de Pais
  if (!data.countries.length)
    errors.countries = "You must select at least one country";

  return errors;
};
