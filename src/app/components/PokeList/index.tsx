import Link from "next/link";
import Image from "next/image";
import type { Pokemon } from "../../hooks/usePokemon";
import PokemonTypes from "../PokemonTypes";
import styles from "./style.module.css";

type Props = {
  pokemons: Pokemon[];
};

export default function PokeList({ pokemons }: Props) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {pokemons.map((p) => (
          <li key={p.id} className={styles.listItem}>
            <Link href={`/detalhes/${p.id}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                <Image
                  src={p.image}
                  alt={`Sprite de ${p.name}`}
                  width={76}
                  height={76}
                  sizes="76px"
                  className={styles.image}
                />
              </div>
              <div>
                <span className={styles.number}>Nº {String(p.id).padStart(3, "0")}</span>
                <p className={styles.name}>{p.name}</p>
                <PokemonTypes types={p.types} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
