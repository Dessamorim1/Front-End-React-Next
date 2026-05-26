import "./project.css";

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <div className="projects-header">
        <div className="projects-subtitle">
          <span className="line"></span>
          PORTFÓLIO
        </div>

        <h1>
          Projetos <span>em destaque</span>
        </h1>

        <div className="header-line"></div>
      </div>

      <section className="projects-grid">

        <div className="project-card">
          <div className="card-top">
            <div className="icon-box">💻</div>

            <div className="category">
              FULL STACK
            </div>
          </div>

          <div className="card-content">
            <h2>Sistema Web de Cotações</h2>

            <p>
              Sistema web desenvolvido em Flask integrado ao
              SAP Business One via Service Layer. Permite
              consultar, criar e atualizar cotações e
              concorrentes em tempo real, com autenticação,
              controle de sessão e interface interativa.
            </p>

            <div className="techs">
              <span>Flask</span>
              <span>SAP B1</span>
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
            </div>

            <a
              href="https://github.com/Dessamorim1/Sistema-Cotacoes-Flask"
              target="_blank"
            >
              Ver projeto completo →
            </a>
          </div>
        </div>

        <div className="project-card">
          <div className="card-top">
            <div className="icon-box">🐱</div>

            <div className="category">
              WEB DEVELOPMENT
            </div>
          </div>

          <div className="card-content">
            <h2>ONG de Adoção de Gatos</h2>

            <p>
              Projeto em desenvolvimento de plataforma web
              para ONG de gatos, com funcionalidades de
              cadastro, informações sobre adoção e área
              administrativa para gerenciamento de conteúdo
              e animais disponíveis.
            </p>

            <div className="techs">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>PHP</span>
              <span>MySQL</span>
            </div>

            <a
              href="https://github.com/Dessamorim1/web-ong-gatos"
              target="_blank"
            >
              Ver projeto completo →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}