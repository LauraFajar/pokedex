import { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [showDetails, setShowDetails] = useState(false);

  const imageUrl = pokemon.sprites?.front_default;

  return (
    <div className="pokemon-card" onClick={() => setShowDetails(!showDetails)}>
      <img src={imageUrl} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      {showDetails && (
        <div className="details">
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
          <p>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;


