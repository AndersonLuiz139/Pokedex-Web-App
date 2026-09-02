"use client";

import { useFavorites } from "../hooks/FavoriteContext";
import Link from "next/link";
import styles from "./style.module.css";

export default function FavoritosPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyMessage}>
          Nenhum Pokémon favoritado ainda.
        </p>

        {/* Botão para voltar para a página inicial */}
        <Link href="/" className={styles.backBtn}>
          ⬅ Voltar para lista
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Botão para voltar para a página inicial */}
      <Link href="/" className={styles.backBtn}>
        ⬅ Voltar para lista
      </Link>

      <h1>Pokémons Favoritos</h1>
      <div className={styles.grid}>
        {favorites.map((pokemon) => (
          <div key={pokemon.id} className={styles.card}>
            <img src={pokemon.image} alt={pokemon.name} width={120} height={120} />
            <h2>#{pokemon.id} - {pokemon.name}</h2>
            <Link href={`/detalhes/${pokemon.id}`}>
              <button className={styles.detailsButton}>Ver detalhes</button>
            </Link>
            <button
              onClick={() => removeFavorite(pokemon.id)}
              className={styles.removeButton}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
