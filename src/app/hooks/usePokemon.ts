"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

type PokemonListResponse = {
  results: { name: string }[];
};

type PokemonTypeResponse = {
  pokemon: {
    pokemon: { url: string };
    slot: number;
  }[];
};

const POKEMON_LIMIT = 151;
const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

function getPokemonId(url: string) {
  const match = url.match(/\/pokemon\/(\d+)\/$/);
  return match ? Number(match[1]) : null;
}

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

        const typeResponses = await Promise.all(
          POKEMON_TYPES.map(async (type) => {
            const { data: typeData } = await api.get<PokemonTypeResponse>(`/type/${type}`);
            return { type, pokemon: typeData.pokemon };
          })
        );

        if (!isMounted) return;

        const typesByPokemon = new Map<number, { name: string; slot: number }[]>();

        typeResponses.forEach(({ type, pokemon }) => {
          pokemon.forEach(({ pokemon: typePokemon, slot }) => {
            const id = getPokemonId(typePokemon.url);
            if (!id || id > POKEMON_LIMIT) return;

            const pokemonTypes = typesByPokemon.get(id) ?? [];
            pokemonTypes.push({ name: type, slot });
            typesByPokemon.set(id, pokemonTypes);
          });
        });

        setPokemons(
          data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
            types: (typesByPokemon.get(index + 1) ?? [])
              .sort((first, second) => first.slot - second.slot)
              .map((type) => type.name),
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
