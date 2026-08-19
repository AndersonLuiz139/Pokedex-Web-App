import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  viewMode: "card" | "list";
  setViewMode: (mode: "card" | "list") => void;
};

export default function Header({
  search,
  setSearch,
  viewMode,
  setViewMode,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          src="/image/pokedex.png"
          alt="Web Pokédex"
          width={180}
          height={70}
          priority
          className={styles.logo}
        />

        <label className={styles.searchWrapper}>
          <span className={styles.visuallyHidden}>Buscar Pokémon por nome</span>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Buscar Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
        </label>

        <nav className={styles.buttonGroup} aria-label="Navegação da Pokédex">
          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`${styles.button} ${viewMode === "card" ? styles.active : ""}`}
            aria-pressed={viewMode === "card"}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`${styles.button} ${viewMode === "list" ? styles.active : ""}`}
            aria-pressed={viewMode === "list"}
          >
            Lista
          </button>
          <Link href="/favoritos" className={styles.favoriteLink}>
            ★ Favoritos
          </Link>
        </nav>
      </div>
    </header>
  );
}
