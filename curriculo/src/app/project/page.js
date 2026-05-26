import "./project.css";

async function getRepos() {
  const response = await fetch(
    "https://api.github.com/users/Dessamorim1/repos",
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function ProjectsPage() {
  const repos = await getRepos();

  const filteredRepos = repos.filter(
    (repo) =>
      !repo.fork &&
      repo.description
  );

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
        {filteredRepos.map((repo) => (
          <div
            className="project-card"
            key={repo.id}
          >
            <div className="card-top">
              <div className="icon-box">
                💻
              </div>

              <div className="category">
                {repo.language || "PROJECT"}
              </div>
            </div>

            <div className="card-content">
              <h2>
                {repo.name.replaceAll("-", " ")}
              </h2>

              <p>
                {repo.description}
              </p>

              {/* TECHS */}

              <div className="techs">
                {repo.language && (
                  <span>
                    {repo.language}
                  </span>
                )}

                <span>
                  ⭐ {repo.stargazers_count}
                </span>

                <span>
                  🍴 {repo.forks_count}
                </span>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
              >
                Ver projeto completo →
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}