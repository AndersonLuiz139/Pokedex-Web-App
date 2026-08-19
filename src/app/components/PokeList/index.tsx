import Link from "next/link";
import type { Pokemon } from "../../hooks/usePokemon";
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
              <img src={p.image} alt={p.name} className={styles.image} />
              <p className={styles.name}>
                #{p.id} {p.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
