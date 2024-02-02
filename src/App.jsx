import { useEffect, useState } from "react";
import { getPokemonOf, getPokemonBySearch } from "./helpers/pokemon.helpers";

function App() {
  let [pokemon, setPokemon] = useState([]);
  let [searchField, setSearchField] = useState("");
  let [searchType, setSearchType] = useState("");
  let [weakness, setWeakness] = useState("");

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json "
      );
      const data = await res.json();
      console.log(data);
      setPokemon(data.pokemon);
    }
    getPokemon();
  }, []);
  let weaknesses = getPokemonOf(pokemon, "weaknesses");
  let types = getPokemonOf(pokemon, "type");
  let pokemonAllFilters = getPokemonBySearch(
    pokemon,
    searchField,
    searchType,
    weakness
  );
  return (
    <div className="container">
      <h1>Pokedex</h1>
      <div className="filter">
        <form>
          <label htmlFor="search">Search by Name: </label>
          <input
            type="search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            name="search"
            id="search"
          />

          <label htmlFor="searchType">Filter By Type: </label>
          <select
            className="select-box"
            name="searchType"
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">All</option>
            {types.map((type, idx) => {
              return (
                <option key={type + idx} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <label htmlFor="weakness">Weakness: </label>
          <select
            className="select-box"
            name="weakness"
            id="weakness"
            value={weakness}
            onChange={(e) => setWeakness(e.target.value)}
          >
            <option value="">All</option>
            {weaknesses.map((weakness, idx) => {
              return (
                <option key={weakness + idx} value={weakness}>
                  {weakness}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      {pokemonAllFilters.map((pokemon) => {
        return (
          <div key={pokemon.id}>
            <div className="ind-card">
              <img src={pokemon.img} alt="" />
              <div className="pokemon-info">
                <h2> {pokemon.name}</h2>
                <p>Num: {pokemon.num}</p>
                <p>Type: {pokemon.type.toString()}</p>
                <p>Weaknesses: {pokemon.weaknesses.toString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default App;
