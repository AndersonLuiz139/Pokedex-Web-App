"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

type PokemonListResponse = {
  results: { name: string }[];
};

const POKEMON_LIMIT = 151;

export function usePokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await api.get<PokemonListResponse>("/pokemon", {
          params: { limit: POKEMON_LIMIT },
        });

        if (!isMounted) return;

        setPokemons(
          data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          }))
        );
      } catch {
        if (isMounted) {
          setPokemons([]);
          setError("Não foi possível carregar os Pokémon. Tente novamente mais tarde.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  return { pokemons, isLoading, error };
}
