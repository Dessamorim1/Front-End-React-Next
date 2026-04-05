export function Dado({ valor }) {
    const img = `/dado-${valor}.png`;
    return (
        <div className="container text-center">
            <div className="row align-items-center">
                <div className="col">
                    <p>Valor dado: {valor}</p>
                    <img src={img} style={{ width: 110 }} alt="Dado" />
                </div>
            </div>
        </div>
    );
} 