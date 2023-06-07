import { Link } from "react-router-dom";
import styled from "./LandingPage.module.css";
import welcome from "../../../src/assets/welcome.png";
import countries from "../../../src/assets/countries.png";

const Landing = () => {
  //Renederizar
  return (
    <>
      <div className={styled.landing}>
        <img src={welcome} alt="Welcome to" className={styled.imageWelcome} />
        <img
          src={countries}
          alt="Countries App"
          className={styled.imageCountries}
        />
        <Link to="/home">
          <button className={styled.button}>Let's go</button>
        </Link>
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

export default Landing;
