import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_ACTIVITIES,
  BY_NAME,
  BY_CONTINENT,
  BY_ACTIVITY,
  BY_POPULATION,
  GET_COUNTRY_BY_NAME,
  CLEAR_DETAIL,
} from "./actions";

// Aplicar estado inicial almacenamientos
const initialState = {
  countries: [],
  filteredCountries: [],
  activities: [],
  detailCountry: [],
};

// Definir cómo cambia el estado en respuesta a las acciones
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    // Obtener países
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    // Obtener detalles de un país
    case GET_COUNTRY:
      return {
        ...state,
        detailCountry: payload,
      };
    // Limpiar detalles de un país
    case CLEAR_DETAIL:
      return {
        ...state,
        detailCountry: payload,
      };
    // Obtener actividades
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
    // Obtener países filtrados por nombre
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        filteredCountries: payload,
      };
    // Ordenar países por nombre
    case BY_NAME:
      // Para todos los paises
      if (!state.filteredCountries.length) {
        let copiedCountries = [...state.countries];
        let orderByName;

        if (payload === "Ascending") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Descending") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          countries: orderByName,
        };
        // Para todos los paises filtrados
      } else {
        let copiedCountries = [...state.filteredCountries];
        let orderByName;

        if (payload === "Ascending") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Descending") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          filteredCountries: orderByName,
        };
      }
    // Ordenar países por continente
    case BY_CONTINENT:
      if (payload === "All") {
        return {
          ...state,
          countries: [...state.countries],
          filteredCountries: [...state.countries],
        };
      }
      let filter = [...state.countries].filter(
        (country) => country.region === payload
      );
      return {
        ...state,
        filteredCountries: filter,
      };
    // Ordenar países por población
    case BY_POPULATION:
      if (!state.filteredCountries.length) {
        // Verificar si se están aplicando filtros adicionales
        // Para todos los paises
        let copiedCountries = [...state.countries];
        let orderByPop;

        if (payload === "Descending") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return -1;
            }
            if (a.population > b.population) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Ascending") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return 1;
            }
            if (a.population > b.population) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          countries: orderByPop,
        };
        // Para todos los paises filtrados
      } else {
        let copiedCountries = [...state.filteredCountries];
        let orderByPop;

        if (payload === "Descending") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return -1;
            }
            if (a.population > b.population) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Ascending") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return 1;
            }
            if (a.population > b.population) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          filteredCountries: orderByPop,
        };
      }
    // Ordenar países por Actividad
    case BY_ACTIVITY:
      let filterActivity;

      if (payload === "All") {
        return {
          ...state,
          countries: [...state.countries],
          filteredCountries: [...state.countries],
        };
      } else {
        filterActivity = state.countries.filter((country) => {
          for (let i = 0; i < country.activities.length; i++) {
            if (country.activities[i].name === payload) return true;
          }
          return false;
        });
        return {
          ...state,
          filteredCountries: filterActivity,
        };
      }

    default:
      return { ...state };
  }
}
