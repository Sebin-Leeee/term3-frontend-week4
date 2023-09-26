function Card(props) {
  return (
    <div className="card">
      <div className="country-image">
        <img src={props.image} alt="" />
      </div>
      <div className="country-details">
        <h2>{props.name}</h2>
        <p>
          <span className="first-child">Capital:</span> {props.capital}
        </p>
        <p>
          <span className="first-child"> Population:</span> {props.population}
        </p>
        <p>
          <span className="first-child">Continent:</span> {props.continent}
        </p>
      </div>
    </div>
  );
}

export default Card;
