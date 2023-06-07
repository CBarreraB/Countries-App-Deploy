import styled from "./SearchBar.module.css";
import searchIcon from "../../assets/search.png";

// Valor de entrada cambioa y llamamos a country del valor de entrada
export const SearchBar = ({ searchCountry }) => {
  const handleChange = (e) => {
    searchCountry(e.target.value);
  };
  // Renderizar
  return (
    <div className={styled.searchBox}>
      <input
        className={styled.searchInput}
        placeholder="Search a country..."
        type="search"
        onChange={handleChange}
      />
      <img src={searchIcon} alt="Search" className={styled.search} />
    </div>
  );
};
