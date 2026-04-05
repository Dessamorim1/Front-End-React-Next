import Image from "next/image";
import styles from "./page.module.css";
import { JogoDados } from "@/components/JogoDados";

export default function Home() {
  return (
    <div>
      <JogoDados></JogoDados>
    </div>
  );
}
