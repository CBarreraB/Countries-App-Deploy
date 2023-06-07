import { Link } from "react-router-dom";
import styled from "./Card.module.css";

const Card = (props) => {
  const { id, name, image, continents } = props;
  // Renderizar
  return (
    <>
      <Link to={`/countries/${id}`} className={styled.navlink}>
        <div className={styled.card}>
          <img className={styled.cardImg} src={image} alt={`Flag of ${name}`} />
          <h2 className={styled.cardName}>{name}</h2>
          <h3 className={styled.cardContinent}>{continents}</h3>
        </div>
      </Link>
    </>
  );
};

export default Card;
