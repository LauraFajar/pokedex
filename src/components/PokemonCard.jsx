import React from 'react'
import './PokemonCard.css'

const PokemonCard = ({ name, image, height, weight, ability, registered, onRegister }) => {
  const handleClick = () => {
    if (!registered) {
      onRegister(name)
    }
  }

  return (
    <div
      className={`pokemon-card ${registered ? 'registrado' : 'no-registrado'}`}
      onClick={handleClick}
      style={{ pointerEvents: registered ? 'none' : 'auto' }}
    >
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Altura: {height}</p>
      <p>Peso: {weight}</p>
      <p>Habilidad: {ability}</p>
      <p>{registered ? 'Capturado' : 'Haz clic para capturar'}</p>
    </div>
  )
}

export default PokemonCard