import styled from "./Activity.module.css";

const Activity = (props) => {
  const { name, difficulty, duration, season } = props;
  // Renderizar
  return (
    <>
      <div className={styled.card}>
        <h2 className={styled.activity}>{name}</h2>
        <div className={styled.information}>
          <h3>
            <span className={styled.info}>Difficulty: </span>
            {difficulty}
          </h3>
          <h3>
            <span className={styled.info}>Duration: </span>
            {duration} hrs
          </h3>
          <h3>
            <span className={styled.info}>Season: </span>
            {season}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Activity;
