import React from "react";
import { Link } from "react-router-dom";
import styled from "./NotFound.module.css";
import img404 from "../../../src/assets/404.png";

const NotFound = () => {
  return (
    <>
      <div className={styled.container}>
        <h1 className={styled.notFound}>Page Not Found</h1>
        <img src={img404} alt="404" className={styled.image} />
        <Link to="/home">
          <h3 className={styled.home}>Go to Home!</h3>
        </Link>
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
    </>
  );
};

export default NotFound;
