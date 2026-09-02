import styles from "./style.module.css";

type Props = {
  types: string[];
};

const typeLabels: Record<string, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Metálico",
  fairy: "Fada",
};

export default function PokemonTypes({ types }: Props) {
  return (
    <ul className={styles.list} aria-label="Tipos do Pokémon">
      {types.map((type) => (
        <li key={type} className={styles.badge} data-type={type}>
          {typeLabels[type] ?? type}
        </li>
      ))}
    </ul>
  );
}
