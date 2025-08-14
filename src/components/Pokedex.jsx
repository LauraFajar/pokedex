import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import './Pokedex.css'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50'
const BACKEND_URL = 'http://localhost:3000/api/v2/pokemon'

function Pokedex() {
  const [pokemones, setPokemones] = useState([])
  const [capturados, setCapturados] = useState([])

  const fetchCapturados = async () => {
    try {
      const res = await axios.get(BACKEND_URL)
      setCapturados(res.data.map(p => p.nombre))
    } catch (err) {
      setCapturados([])
    }
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(POKE_API_URL)
      const data = await Promise.all(
        response.data.results.map(async (poke) => {
          const details = await axios.get(poke.url)
          return {
            name: details.data.name,
            image: details.data.sprites.front_default,
            id: details.data.id,
            height: details.data.height,
            weight: details.data.weight,
            ability: details.data.abilities[0]?.ability?.name || 'N/A',
          }
        })
      )
      setPokemones(data)
    }
    fetchPokemons()
    fetchCapturados()
  }, [])

  const handleRegister = async (name) => {
    try {
      await axios.post(BACKEND_URL, { nombre: name })
      fetchCapturados()
    } catch (err) {
      console.error('Error al registrar:', err)
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>Mi pokedex</h1>
      <div className="pokedex-grid">
        {pokemones.map((poke) => (
          <PokemonCard
            key={poke.name}
            name={poke.name}
            image={poke.image}
            height={poke.height}
            weight={poke.weight}
            ability={poke.ability}
            registered={capturados.includes(poke.name)}
            onRegister={handleRegister}
          />
        ))}
      </div>
    </div>
  )
}

export default Pokedex