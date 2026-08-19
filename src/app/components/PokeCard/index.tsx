"use client";

import Link from "next/link";
import { useFavorites } from "../../hooks/FavoriteContext";
import type { Pokemon } from "../../hooks/usePokemon";
import styles from "./style.module.css";

type Props = {
  pokemons: Pokemon[];
};

export default function PokeCard({ pokemons }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) removeFavorite(pokemon.id);
    else addFavorite(pokemon);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.grid}>
        {pokemons.map((p) => (
          <li key={p.id} className={styles.card}>
            {/* link para a página de detalhes */}
            <Link href={`/detalhes/${p.id}`} className={styles.link}>
              <img src={p.image} alt={p.name} className={styles.image} />
              <p className={styles.name}>#{p.id} {p.name}</p>
            </Link>

            <button
              className={styles.favoriteBtn}
              onClick={() => handleFavorite(p)}
            >
              {isFavorite(p.id) ? "★ Remover" : "☆ Favoritar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
