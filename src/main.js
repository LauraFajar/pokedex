const pokedex = document.getElementById('pokedex');

const fetchPokemons = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=50';
  const res = await fetch(url);
  const data = await res.json();
  const results = data.results;

  const pokemonData = await Promise.all(
    results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );

  renderPokemons(pokemonData);
};

const renderPokemons = (pokemonList) => {
  pokedex.innerHTML = '';

  pokemonList.forEach((pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-img" />
      <div class="pokemon-name">#${pokemon.id} - ${pokemon.name}</div>
      <div class="pokemon-info">
        <p>Estatura: ${pokemon.height}</p>
        <p>Peso: ${pokemon.weight}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      const info = card.querySelector('.pokemon-info');
      info.style.display = info.style.display === 'block' ? 'none' : 'block';
    });

    pokedex.appendChild(card);
  });
};

fetchPokemons();

