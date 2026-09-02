"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "../../hooks/FavoriteContext";
import type { Pokemon } from "../../hooks/usePokemon";
import PokemonTypes from "../PokemonTypes";
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
              <div className={styles.imageWrapper}>
                <Image
                  src={p.image}
                  alt={`Sprite de ${p.name}`}
                  width={180}
                  height={180}
                  sizes="(max-width: 560px) 160px, 180px"
                  className={styles.image}
                />
              </div>
              <span className={styles.number}>Nº {String(p.id).padStart(3, "0")}</span>
              <p className={styles.name}>{p.name}</p>
              <PokemonTypes types={p.types} />
            </Link>

            <button
              type="button"
              className={`${styles.favoriteBtn} ${
                isFavorite(p.id) ? styles.isFavorite : ""
              }`}
              onClick={() => handleFavorite(p)}
              aria-label={
                isFavorite(p.id)
                  ? `Remover ${p.name} dos favoritos`
                  : `Adicionar ${p.name} aos favoritos`
              }
            >
              {isFavorite(p.id) ? "★ Remover" : "☆ Favoritar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
