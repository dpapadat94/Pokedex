export function filterPokemonByType(pokemon, type) {
  if (type) return pokemon.filter((pokemon) => pokemon.type == type);
  else return pokemon;
}

export function getPokemonBySearch(pokemon, search, type, weakness) {
  if (search) {
    return pokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  } else if (type && weakness) {
    return pokemon.filter(
      (pokemon) => pokemon.type == type && pokemon.weaknesses == weakness
    );
  } else if (type) {
    return pokemon.filter((pokemon) => pokemon.type == type);
  } else if (weakness) {
    console.log(weakness);
    return pokemon.filter((pokemon) => pokemon.weaknesses == weakness);
  } else {
    return pokemon;
  }
}

export function getPokemonOf(pokemon, prop) {
  return [...new Set(pokemon.map((pokemon) => pokemon[prop] || ""))];
}
