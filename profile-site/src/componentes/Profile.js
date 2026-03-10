export function Profile() {
    return (
        <section className="profile">
            <div className="profile-container">
                <div className="profile-text">
                    <h1>
                        Olá, eu sou <span className="highlight">Andressa Amorim</span>
                    </h1>

                    <h3>
                        Desenvolvedora Full Stack <br />
                        <span className="highlight">& Analista SAP B1</span>
                    </h3>

                    <p>
                       Sou estudante de Sistemas de Informação e tenho interesse em tecnologia e desenvolvimento de software. 
                       Atualmente estudo desenvolvimento web e programação, buscando aprender novas ferramentas e melhorar minhas habilidades.
                    </p>
                </div>

                <div className="profile-image">
                    <img
                        src="Profile.jpeg"
                        alt="Andressa Karine"
                    />
                </div>
            </div>
        </section>
    );
}