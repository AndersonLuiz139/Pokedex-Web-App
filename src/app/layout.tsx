import './globals.css';
import { ReactNode } from 'react';
import { FavoritesProvider } from './hooks/FavoriteContext';

export const metadata = {
  applicationName: 'Pokédex',
  title: 'Pokédex | Explore os 151 Pokémon originais',
  description:
    'Explore, pesquise e favorite os 151 Pokémon originais em uma Pokédex interativa.',
  icons: {
    icon: "/image/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
