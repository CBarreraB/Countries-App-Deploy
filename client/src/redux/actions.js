import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const BY_CONTINENT = "BY_CONTINENT";
export const BY_ACTIVITY = "BY_ACTIVITY";
export const BY_NAME = "BY_NAME";
export const BY_POPULATION = "BY_POPULATION";

// Exportar funciones como acciones

// Obtener todos los países
export const getCountries = () => {
  return async function (dispatch) {
    // Llamada a la API para obtener los países
    const apiData = await axios.get("/countries");
    const countries = apiData.data;
    // Despachar una acción con los países obtenidos
    dispatch({
      type: GET_COUNTRIES,
      payload: countries,
    });
  };
};

// Obtener todos los los detalles de un país específico
export const getCountry = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`/countries/${id}`);
    const country = apiData.data;
    dispatch({
      type: GET_COUNTRY,
      payload: country,
    });
  };
};

//b Borrar los detalles de un país en el estado de la aplicación
export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  };
};

// Obtener un país por su nombre
export const getCountryByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(`/countries?name=${name}`);
    const country = apiData.data;
    dispatch({
      type: GET_COUNTRY_BY_NAME,
      payload: country,
    });
  };
};
// Obtener todas las actividades
export const getAllActivities = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/activities");
    const activities = apiData.data;
    dispatch({
      type: GET_ACTIVITIES,
      payload: activities,
    });
  };
};

// Ordenar países por nombre
export const orderByName = (name) => {
  return {
    type: BY_NAME,
    payload: name, // Nombre del ordenamiento (Ascendente o Descendente)
  };
};

// Filtrar paises por continente
export const continentFilter = (continents) => {
  return {
    type: BY_CONTINENT,
    payload: continents, // Array de continentes seleccionados para el filtro
  };
};

// Ordenar países por poblacion
export const orderByPopulation = (pop) => {
  return {
    type: BY_POPULATION,
    payload: pop, // Tipo de ordenamiento (Ascendente o Descendente)
  };
};

// Filtrar países por actividad
export const activityFilter = (name) => {
  return {
    type: BY_ACTIVITY,
    payload: name, // Nombre de la actividad seleccionada para el filtro
  };
};
