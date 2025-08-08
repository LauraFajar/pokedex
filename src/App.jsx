import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './index.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const promises = res.data.results.map(pokemon => axios.get(pokemon.url));
        const responses = await Promise.all(promises);
        const detailedData = responses.map(r => r.data);
        setPokemonList(detailedData);
      } catch (error) {
        console.error('Error al obtener pokémones:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="container">
      <h1>Mi Pokedex</h1>
      <div className="pokemon-grid">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;




