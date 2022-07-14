import { fetchPokemon, fetchTotalPokemon } from "../services";
import { getRandomNumberEqualOrUnder } from "../helpers";
import { useEffect, useState } from "react";

const usePokemon = () => {
  const [totalPokemonNumber, setTotalPokemonNumber] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();

  const nextPokemon = () => {
    fetchPokemon(
      (currentPokemon.id + 1) % totalPokemonNumber,
      setCurrentPokemon
    );
  };
  const previousPokemon = () => {
    fetchPokemon(
      (currentPokemon.id - 1) % totalPokemonNumber,
      setCurrentPokemon
    );
  };
  useEffect(() => {
    if (!totalPokemonNumber) {
      fetchTotalPokemon(setTotalPokemonNumber);
    } else {
      fetchPokemon(
        getRandomNumberEqualOrUnder(totalPokemonNumber),
        setCurrentPokemon
      );
    }
  }, [totalPokemonNumber]);

  return {
    totalPokemonNumber,
    currentPokemon,
    setCurrentPokemon,
    nextPokemon,
    previousPokemon,
  };
};

export default usePokemon;
