import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { validate } from "./validation";
import styled from "./Form.module.css";
import create from "../../../src/assets/create.png";

const Form = () => {
  // Definición de duración disponible para seleccionar
  const duration = [1, 2, 3, 6, 9, 12];

  // Obtener todos los países del estado utilizando useSelector y ordenarlos alfabéticamente
  const allCountries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // Estado inicial del formulario
  const [form, setForm] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  });

  // Verificar el estado del formulario y determinar si está completo
  useEffect(() => {
    const checkFormComplete = () => {
      if (
        !form.name ||
        !form.difficulty ||
        !form.duration ||
        !form.season ||
        !form.countries.length
      ) {
        setFormComplete(false);
      } else {
        setFormComplete(true);
      }
    };
    checkFormComplete();
  }, [form]);

  // Estado -> errores de validación del formulario
  const [errors, setErrors] = useState({});
  // Estado -> estado de completitud del formulario
  const [formComplete, setFormComplete] = useState(false);
  // Estado -> mensaje de creación exitosa
  const [created, setCreated] = useState("");

  // Manejar los cambios en los inputs del formulario
  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  // Manejar la selección de un país en el formulario
  const selectCountry = (e) => {
    if (!form.countries.includes(e.target.value)) {
      setForm({
        ...form,
        countries: [...form.countries, e.target.value],
      });
    }
    setErrors(validate({ ...form, countries: e.target.value }));
    e.target.value = "";
  };

  // Manejar el borrado de un país seleccionado
  const handleDelete = (name) => {
    setForm({
      ...form,
      countries: form.countries.filter((country) => country !== name),
    });
  };

  // Limpiar el formulario estableciendo los valores iniciales
  const clearForm = () => {
    setFormComplete(false);
    setForm({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: [],
    });
  };

  // Enviar el formulario cuando se hace clic en el botón
  const submitForm = async (e) => {
    e.preventDefault();
    if (formComplete === true) {
      await axios.post("/activities", form);
      setCreated("Activity successfully created!");
    }
    clearForm();
  };

  // Renderizar
  return (
    <form className={styled.form} onSubmit={submitForm}>
      <img src={create} alt="Create an activity" className={styled.image} />
      <div className={styled.activityContainer}>
        <div className={styled.nameContainer}>
          <input
            className={styled.inputName}
            onChange={handleInputs}
            placeholder="Activity Name..."
            type="text"
            value={form.name}
            name="name"
          />
          <span className={styled.spans}>{errors.name}</span>
        </div>

        <div className={styled.diffContainer}>
          <label>Difficulty</label>
          <select
            className={styled.selects}
            onChange={handleInputs}
            value={form.difficulty}
            name="difficulty">
            <option value="hidden" hidden>
              1 to 5
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span className={styled.spans}>{errors.difficulty}</span>
        </div>

        <div className={styled.durationContainer}>
          <label>Duration</label>
          <select
            className={styled.selects}
            onChange={handleInputs}
            value={form.duration}
            name="duration">
            <option value="" hidden>
              ...Hours
            </option>

            {duration.map((e, index) => (
              <option key={index} value={e} name="duration">
                {e}
              </option>
            ))}
          </select>
          <span className={styled.spans}>{errors.duration}</span>
        </div>

        <div className={styled.seasonContainer}>
          <label>Season</label>
          <select
            className={styled.selects}
            onChange={handleInputs}
            value={form.season}
            name="season">
            <option value="">Select...</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
          <span className={styled.spans}>{errors.season}</span>
        </div>

        <div className={styled.countryContainer}>
          <div className={styled.listCountries}>
            <label>Country</label>
            <select className={styled.selectCountry} onChange={selectCountry}>
              <option value="" hidden>
                Select countries...
              </option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <span className={styled.spans}>{errors.countries}</span>
          </div>

          <div className={styled.selectedCountry}>
            {form.countries.map((c, i) => (
              <div key={i}>
                <span className={styled.countryName}>{c}</span>
                <button
                  className={styled.deleteButton}
                  onClick={() => handleDelete(c)}
                  type="button">
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        {formComplete ? (
          <span>{created}</span>
        ) : (
          <span className={styled.warning}>Please complete all fields</span>
        )}
        <div className={styled.buttons}>
          <button
            className={styled.createButton}
            disabled={!formComplete}
            type="submit">
            Create
          </button>
          <button onClick={clearForm} className={styled.clearButton}>
            Clear
          </button>
        </div>
        <span>{created}</span>
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
    </form>
  );
};

export default Form;
