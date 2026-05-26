import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="subtitle">
          <span className="line"></span>
          DESENVOLVEDORA FULL STACK
        </div>

        <h1>
          Andressa <br />
          <span>Amorim</span>
        </h1>

        <p>
          Desenvolvo aplicações modernas e escaláveis —
          <br />
          unindo backend robusto, interfaces intuitivas
          <br />
          e soluções inteligentes para transformar ideias
          <br />
          em experiências digitais.
        </p>

        <Link
          href="https://github.com/Dessamorim1"
          target="_blank"
          className="projects-button"
        >
          Ver projetos
        </Link>
      </div>

      <div className="hero-right">
        <div className="image-glow"></div>

        <div className="tag">
          Python · FastAPI · SQL
        </div>

        <div className="profile-image">
          <Image
            src="/me.jpeg"
            alt="Andressa Amorim"
            fill
            className="img"
            priority
          />
        </div>

        <div className="card-info">
          <h3>Full</h3>
          <span>STACK DEVELOPER</span>
        </div>
      </div>
    </section>
  );
}