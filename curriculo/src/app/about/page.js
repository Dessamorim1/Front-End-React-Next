import "./about.css";

export default function AboutPage() {
  return (
    <main className="about-section">
      <div className="about-left">
        <div className="about-subtitle">
          <span className="line"></span>
          SOBRE MIM
        </div>

        <h1>
          Código com <span>propósito</span>
        </h1>

        <div className="about-line"></div>

        <p>
          Desenvolvedora Full Stack apaixonada por criar
          aplicações modernas, escaláveis e funcionais,
          unindo backend robusto e interfaces intuitivas.
        </p>

        <p>
          Ao longo da minha trajetória, desenvolvi soluções
          utilizando <strong>Python, FastAPI, SQL e Next.js</strong>,
          com foco em performance, organização e experiência
          do usuário.
        </p>

        <p>
          Tenho facilidade para <strong>resolver problemas</strong>,
          estruturar aplicações e transformar ideias em produtos
          digitais eficientes e bem construídos.
        </p>
      </div>

      <div className="about-right">
        <div className="info-card">
          <h2>10+</h2>
          <span>
            Projetos desenvolvidos com foco em backend
            e aplicações web modernas
          </span>
        </div>

        <div className="info-card">
          <h2>100%</h2>
          <span>
            APIs estruturadas seguindo boas práticas
            e arquitetura organizada
          </span>
        </div>

        <div className="info-card">
          <h2>Fast</h2>
          <span>
            Desenvolvimento com foco em performance
            e experiência do usuário
          </span>
        </div>

        <div className="info-card">
          <h2>SQL</h2>
          <span>
            Modelagem, integração e manipulação
            eficiente de dados
          </span>
        </div>
      </div>
    </main>
  );
}