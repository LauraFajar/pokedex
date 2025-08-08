import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10'
const BACKEND_URL = 'http://localhost:3000/api/pokemones'

function Pokedex() {
  const [pokemones, setPokemones] = useState([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(POKE_API_URL)
      const data = await Promise.all(
        response.data.results.map(async (poke) => {
          const details = await axios.get(poke.url)
          const registered = await checkIfRegistered(details.data.name)
          return {
            name: details.data.name,
            image: details.data.sprites.front_default,
            registered,
          }
        })
      )
      setPokemones(data)
    }

    const checkIfRegistered = async (name) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/${name}`)
        return res.data.registrado === true
      } catch {
        return false
      }
    }

    fetchPokemons()
  }, [])

  const handleRegister = async (name) => {
    try {
      await axios.post(BACKEND_URL, { nombre: name })
      setPokemones((prev) =>
        prev.map((p) =>
          p.name === name ? { ...p, registered: true } : p
        )
      )
    } catch (err) {
      console.error('Error al registrar:', err)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {pokemones.map((poke) => (
        <PokemonCard
          key={poke.name}
          name={poke.name}
          image={poke.image}
          registered={poke.registered}
          onRegister={handleRegister}
        />
      ))}
    </div>
  )
}

export default Pokedex
