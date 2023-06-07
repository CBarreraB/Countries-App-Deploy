const axios = require("axios");
const { Country } = require("../db");

const getApiData = async () => {
  //Solicitud GET a la API
  let countries = await axios.get("https://restcountries.com/v3/all");
  // iterar sobre cada country
  await countries.data.map((country) => {
    let countryDet = {
      id: country.cca3,
      name: country.name.common,
      image: country.flags[1],
      continents: country.continents[0],
      capital: country.capital ? country.capital[0] : "Has no capital",
      subregion: country.subregion ? country.subregion : "Has no subregion",
      area: country.area,
      region: country.region,
      population: country.population,
    };
    //si esta creado el country no se crea de nuevo
    Country.findOrCreate({ where: countryDet });
  });
};

module.exports = getApiData;
