import styled from "./Cards.module.css";
import loading from "../../assets/load.gif";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  continentFilter,
  activityFilter,
  orderByName,
  orderByPopulation,
  getCountryByName,
} from "../../redux/actions";
import Card from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Cards.module.css";

const Cards = () => {
  // Variables de estado y selección
  const countriesGlobal = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const filterCountries = useSelector((state) => state.filteredCountries);

  // Variables y estado adicional
  const [countries, setCountries] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const cardsByPage = 10;

  // Cálculos y lógica de paginación
  const lastCard = actualPage * cardsByPage;
  const firstCard = lastCard - cardsByPage;
  const totalPages = Math.ceil(filterCountries.length / cardsByPage);
  const page = countries.slice(firstCard, lastCard);

  // Actualizar el estado de "countries" con el valor de "countriesGlobal"
  useEffect(() => {
    setCountries(countriesGlobal);
  }, [countriesGlobal]);

  // Actualizar el estado de "countries" con el valor de "filterCountries"
  // y restablecer la página actual a 1
  useEffect(() => {
    setCountries(filterCountries);
    setActualPage(1);
  }, [filterCountries]);

  // Enviar acciones a la store
  const dispatch = useDispatch();

  // Filtrar por continente
  const filterByContinent = (e) => {
    dispatch(continentFilter(e.target.value));

    if (e.target.value === "All") {
      setCountries([...countries]);
    } else {
      setCountries([...filterCountries]);
    }
    e.target.value = "";
  };

  // Ordenar por nombre
  const orderName = (e) => {
    dispatch(orderByName(e.target.value));
    e.target.value = "";
  };

  // Ordenar por población
  const orderPopulation = (e) => {
    dispatch(orderByPopulation(e.target.value));
    e.target.value = "";
  };

  // Filtrar por actividad
  const filterByActivity = (e) => {
    dispatch(activityFilter(e.target.value));
    if (e.target.value === "All") {
      setCountries([...countries]);
    } else {
      setCountries([...filterCountries]);
    }
    e.target.value = "";
  };

  let newAcitivities;

  if (Array.isArray(activities)) {
    newAcitivities = activities.filter(
      (obj, index, arr) => index === arr.findIndex((t) => t.name === obj.name)
    );
  }

  // Buscar un país por nombre
  const searchCountry = (name) => {
    dispatch(getCountryByName(name));
    setCountries([...filterCountries]);
  };

  // Renderizar
  return (
    <>
      <div className={styled.filtersContainer}>
        <div className={styled.searchBar}>
          <SearchBar searchCountry={searchCountry} />
        </div>
        <div className={styled.filters}>
          <select
            className={styled.selectContinent}
            onChange={filterByContinent}>
            <option value="" hidden>
              Continent
            </option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select className={styled.selects} onChange={orderName}>
            <option value="" hidden>
              Order
            </option>
            <option value="Ascending">A - Z</option>
            <option value="Descending">Z - A</option>
          </select>

          <select className={styled.selects} onChange={orderPopulation}>
            <option value="" hidden>
              Population
            </option>
            <option value="Ascending">More population</option>
            <option value="Descending">Less population</option>
          </select>

          <select
            className={styled.selectActivity}
            name="activity"
            onChange={filterByActivity}>
            <option value="" hidden>
              Activity
            </option>
            <option value="All">All</option>
            {Array.isArray(newAcitivities) ? (
              newAcitivities.map((activity) => {
                return (
                  <option key={activity.id} value={activity.name}>
                    {activity.name}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                Create a new activity
              </option>
            )}
          </select>
        </div>
      </div>

      <div className={styled.cardContainer}>
        {!page.length ? (
          <img className={styled.loading} src={loading} alt="loading-img" />
        ) : (
          page.map((country) => {
            return (
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                image={country.image}
                continents={country.continents}
              />
            );
          })
        )}
      </div>
      <div className={styled.buttonPage}>
        {totalPages === 1 ? null : actualPage === 1 ? (
          <>
            <button className={styled.pageOne}>{actualPage}</button>
            <button
              className={styled.nextButton}
              onClick={() => setActualPage(actualPage + 1)}>
              Next
            </button>
          </>
        ) : page.length < cardsByPage || actualPage === 25 ? (
          <>
            <button
              className={styled.prevButton}
              onClick={() => setActualPage(actualPage - 1)}>
              Prev
            </button>
            <button className={styled.pageEnd}>{actualPage}</button>
          </>
        ) : (
          <>
            <button
              className={styled.prevButton}
              onClick={() => setActualPage(actualPage - 1)}>
              Prev
            </button>
            <button
              className={styled.actualPage}
              onClick={() => setActualPage(actualPage - 2)}>
              {actualPage - 2}
            </button>
            <button
              className={styled.actualPage}
              onClick={() => setActualPage(actualPage - 1)}>
              {actualPage - 1}
            </button>
            <button className={styled.actualPageActive}>{actualPage}</button>
            <button
              className={styled.actualPage}
              onClick={() => setActualPage(actualPage + 1)}>
              {actualPage + 1}
            </button>
            <button
              className={styled.actualPage}
              onClick={() => setActualPage(actualPage + 2)}>
              {actualPage + 2}
            </button>
            <button
              className={styled.nextButton}
              onClick={() => setActualPage(actualPage + 1)}>
              Next
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cards;
