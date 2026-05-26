import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/great-vibes";
import "./globals.css";
import { Navbar } from '@/components/Navbar.';


export const metadata = {
  title: "Andressa Amorim",
  description: "Portfólio Full Stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}