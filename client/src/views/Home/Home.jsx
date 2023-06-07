import Cards from "../../components/Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllActivities, getCountries } from "../../redux/actions";
import styled from "./Home.module.css";

const Home = () => {
  // Logica del componente
  const dispatch = useDispatch();
  // Solicitamos paises y actividades
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());
  }, [dispatch]);
  // Renderizar
  return (
    <>
      <div className={styled.cardContainer}>
        <Cards />
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
    </>
  );
};

export default Home;
