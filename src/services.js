export const fetchTotalPokemon = (callback) => {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((response) => response.json())
    .then((data) => callback(data.count));
};

export const fetchPokemon = (id, callback) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};
