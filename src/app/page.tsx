"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokeCard from "./components/PokeCard";
import PokeList from "./components/PokeList";
import { usePokemon } from "./hooks/usePokemon";
import styles from "./page.module.css";

export default function Page() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { pokemons, isLoading, error } = usePokemon();
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header search={search} setSearch={setSearch} setViewMode={setViewMode} />
      <main className={styles.content}>
        {isLoading ? (
          <p className={styles.feedback} role="status">
            Carregando Pokémon...
          </p>
        ) : error ? (
          <p className={`${styles.feedback} ${styles.error}`} role="alert">
            {error}
          </p>
        ) : filteredPokemons.length === 0 ? (
          <p className={styles.feedback} role="status">
            Nenhum Pokémon encontrado para “{search}”.
          </p>
        ) : viewMode === "card" ? (
          <PokeCard pokemons={filteredPokemons} />
        ) : (
          <PokeList pokemons={filteredPokemons} />
        )}
      </main>
      <Footer />
    </>
  );
}
