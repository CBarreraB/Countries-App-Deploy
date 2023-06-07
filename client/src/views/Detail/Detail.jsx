import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountry } from "../../redux/actions";
import { clearDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import styled from "./Detail.module.css";
import loading from "../../assets/load.gif";
import backButton from "../../assets/backButton.png";

const Detail = () => {
  // Logica del componente
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.detailCountry);

  useEffect(() => {
    dispatch(getCountry(id));
    return () => {
      // Limpiar al desmontar
      dispatch(clearDetail());
    };
  }, [dispatch, id]);
  // Renderizar
  return (
    <>
      {!country.name ? (
        <img className={styled.loading} src={loading} alt="loading-img" />
      ) : (
        <div className={styled.container}>
          <div className={styled.title}>
            <h1>{country?.name}</h1>
          </div>
          <div className={styled.detailContainer}>
            <img className={styled.flag} src={country?.image} alt="flag" />

            <div className={styled.information}>
              <div>
                <h3>
                  <span className={styled.info}>Country ID: </span>{" "}
                  {country?.id}
                </h3>
                <h3>
                  <span className={styled.info}>Official Name: </span>
                  {country?.name}
                </h3>
                <h3>
                  <span className={styled.info}>Capital: </span>
                  {country?.capital}
                </h3>{" "}
                <h3>
                  <span className={styled.info}>Continent: </span>
                  {country?.continents}
                </h3>
                {country.subregion && (
                  <h3>
                    <span className={styled.info}>Subregion: </span>
                    {country.subregion}
                  </h3>
                )}
                {country.area && (
                  <h3>
                    <span className={styled.info}>Area: </span>
                    {country.area} Km²
                  </h3>
                )}
                <h3>
                  <span className={styled.info}>Population: </span>
                  {country?.population}
                </h3>
              </div>
              <div className={styled.containerButton}>
                <Link to="/home">
                  <img
                    className={styled.backButton}
                    src={backButton}
                    alt="back"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className={styled.author}>
            <h3>
              Made with ❤ by{" "}
              <a
                href="https://www.linkedin.com/in/carlos-barrera/"
                target="_blank"
                rel="noreferrer">
                Carlos Barrera{" "}
              </a>
              - 2023
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
