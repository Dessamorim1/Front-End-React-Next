import Link from "next/link";

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 px-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Andressa Amorim</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">SOBRE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/project">PROJETOS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/experience">EXPERIÊNCIA</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}