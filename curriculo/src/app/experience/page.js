import "./experience.css";

export default function ExperiencePage() {
    return (
        <main className="experience-page">
            <div className="experience-header">
                <div className="experience-subtitle">
                    <span className="line"></span>
                    EXPERIÊNCIA
                </div>

                <h1>
                    Minha <span>trajetória</span>
                </h1>

                <div className="header-line"></div>
            </div>

            <section className="timeline">
                {/* ITEM 1 */}

                <div className="timeline-item">
                    <div className="timeline-dot"></div>

                    <div className="timeline-card">
                        <span className="date">
                            2024 • 2025
                        </span>

                        <h2>
                            Jovem Aprendiz Administrativo
                        </h2>

                        <h3>
                            SAFE Suporte à Vida
                        </h3>

                        <p>
                            Início da trajetória profissional atuando no setor
                            administrativo, auxiliando em organização de
                            processos, controle de informações e suporte
                            operacional. Com o tempo, passei a desenvolver
                            soluções tecnológicas internas e atuar diretamente
                            com sistemas e automações.
                        </p>

                        <div className="experience-techs">
                            <span>Organização</span>
                            <span>Processos</span>
                            <span>Excel</span>
                            <span>Suporte</span>
                            <span>Administração</span>
                        </div>
                    </div>
                </div>

                {/* ITEM 2 */}

                <div className="timeline-item">
                    <div className="timeline-dot"></div>

                    <div className="timeline-card">
                        <span className="date">
                            2025 • 2026
                        </span>

                        <h2>
                            Estagiária de TI
                        </h2>

                        <h3>
                            SAFE Suporte à Vida
                        </h3>

                        <p>
                            Atuação no suporte e desenvolvimento de soluções
                            internas, automação de processos e integração
                            de sistemas utilizando Python, Flask e SAP
                            Business One. Participação em melhorias de
                            fluxo, gerenciamento de dados e aplicações web.
                        </p>

                        <div className="experience-techs">
                            <span>Python</span>
                            <span>Flask</span>
                            <span>SAP B1</span>
                            <span>SQL</span>
                            <span>JavaScript</span>
                        </div>
                    </div>
                </div>

                {/* ITEM 3 */}

                <div className="timeline-item">
                    <div className="timeline-dot"></div>

                    <div className="timeline-card">
                        <span className="date">
                            2026 • Atual
                        </span>

                        <h2>
                            Estagiária Desenvolvedora Full Stack
                        </h2>

                        <h3>
                            FASA - Universidade Católica de Pernambuco
                        </h3>

                        <p>
                            Desenvolvimento de aplicações full stack,
                            APIs REST, sistemas web e automações com
                            foco em performance, arquitetura organizada
                            e experiência do usuário. Criação de soluções
                            utilizando FastAPI e Angular.
                        </p>

                        <div className="experience-techs">
                            <span>FastAPI</span>
                            <span>Next.js</span>
                            <span>Flask</span>
                            <span>MySQL</span>
                            <span>Docker</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}