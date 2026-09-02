"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PokemonTypes from "../../components/PokemonTypes";
import { useFavorites } from "../../hooks/FavoriteContext";
import { api } from "@/services/api";
import styles from "./style.module.css";

type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: { "official-artwork"?: { front_default: string | null } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number;
};

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque especial",
  "special-defense": "Defesa especial",
  speed: "Velocidade",
};

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await api.get<PokemonDetail>(`/pokemon/${id}`);
        if (isMounted) setPokemon(data);
      } catch {
        if (isMounted) {
          setPokemon(null);
          setError("Não foi possível carregar os detalhes deste Pokémon.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (id) loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <p className={styles.feedback}>Carregando detalhes do Pokémon...</p>;
  }

  if (error || !pokemon) {
    return (
      <div className={styles.feedbackWrapper}>
        <p className={styles.feedback} role="alert">
          {error ?? "Pokémon não encontrado."}
        </p>
        <Link href="/" className={styles.backLink}>
          Voltar para a Pokédex
        </Link>
      </div>
    );
  }

  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "/image/favicon.png";
  const pokemonTypes = pokemon.types.map(({ type }) => type.name);
  const isPokemonFavorite = isFavorite(pokemon.id);

  const handleFavorite = () => {
    if (isPokemonFavorite) {
      removeFavorite(pokemon.id);
      return;
    }

    addFavorite({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default ?? artwork,
    });
  };

  return (
    <main className={styles.pageDetails}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Voltar para a Pokédex
        </Link>
      </div>

      <article className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.imageWrapper}>
            <Image
              src={artwork}
              alt={`Arte oficial de ${pokemon.name}`}
              width={360}
              height={360}
              sizes="(max-width: 760px) 280px, 360px"
              className={styles.pokeImage}
              priority
            />
          </div>
          <p className={styles.number}>Nº {String(pokemon.id).padStart(3, "0")}</p>
          <h1 className={styles.title}>{pokemon.name}</h1>
          <PokemonTypes types={pokemonTypes} />

          <button
            type="button"
            onClick={handleFavorite}
            className={`${styles.favoriteBtn} ${isPokemonFavorite ? styles.isFavorite : ""}`}
          >
            {isPokemonFavorite ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
          </button>
        </section>

        <section className={styles.content} aria-label="Informações do Pokémon">
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span>Altura</span>
              <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Peso</span>
              <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Experiência base</span>
              <strong>{pokemon.base_experience}</strong>
            </div>
          </div>

          <section className={styles.infoSection}>
            <h2>Habilidades</h2>
            <ul className={styles.abilities}>
              {pokemon.abilities.map(({ ability }) => (
                <li key={ability.name}>{ability.name.replaceAll("-", " ")}</li>
              ))}
            </ul>
          </section>

          <section className={styles.infoSection}>
            <h2>Estatísticas base</h2>
            <ul className={styles.stats}>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <li key={stat.name} className={styles.stat}>
                  <div className={styles.statHeader}>
                    <span>{statLabels[stat.name] ?? stat.name}</span>
                    <strong>{base_stat}</strong>
                  </div>
                  <div
                    className={styles.statTrack}
                    role="progressbar"
                    aria-label={statLabels[stat.name] ?? stat.name}
                    aria-valuemin={0}
                    aria-valuemax={180}
                    aria-valuenow={base_stat}
                  >
                    <span
                      className={styles.statValue}
                      style={{ width: `${Math.min((base_stat / 180) * 100, 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </article>
    </main>
  );
}
