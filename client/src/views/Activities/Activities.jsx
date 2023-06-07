import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllActivities } from "../../redux/actions";
import styled from "./Activities.module.css";
import Activity from "../../components/Activity/Activity";
import imgActivities from "../../assets/activities.png";

const Activities = () => {
  // Logica del componente
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  //Renderizar
  return (
    <>
      <img src={imgActivities} alt="Activities" className={styled.image} />
      <div>
        <div className={styled.cardContainer}>
          {allActivities?.length ? (
            allActivities.map((activity) => (
              <Activity
                key={activity.id}
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
              />
            ))
          ) : (
            <h2>Not activities yet</h2>
          )}
        </div>

        <Link to="/form">
          <button className={styled.newButton}>Create a new activity</button>
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

export default Activities;
