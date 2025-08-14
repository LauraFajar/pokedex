const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';
const BACKEND_URL = 'http://localhost:3000/pokemon';

const pokedexDiv = document.getElementById('pokedex');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const captureBtn = document.getElementById('captureBtn');

let capturedPokemons = [];

async function fetchCaptured() {
  const res = await fetch(`${BACKEND_URL}/captured`);
  capturedPokemons = await res.json();
}

function isCaptured(pokeId) {
  return capturedPokemons.some(p => p.pokeId === pokeId);
}

async function renderPokedex() {
  await fetchCaptured();
  const res = await fetch(API_URL);
  const data = await res.json();
  pokedexDiv.innerHTML = '';
  for (const [i, poke] of data.results.entries()) {
    const pokeId = i + 1;
    const card = document.createElement('div');
    card.className = 'card' + (isCaptured(pokeId) ? ' captured' : '');
    card.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png" alt="${poke.name}">
      <h3>${poke.name}</h3>
      <span>#${pokeId}</span>
      ${isCaptured(pokeId) ? '<div>Capturado</div>' : ''}
    `;
    card.onclick = () => openModal(pokeId, poke.name);
    pokedexDiv.appendChild(card);
  }
}

async function openModal(pokeId, name) {
  // Busca si está capturado
  const captured = capturedPokemons.find(p => p.pokeId === pokeId);
  let info;
  if (captured) {
    info = captured;
  } else {
    // Fetch info from PokeAPI
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const data = await res.json();
    info = {
      pokeId,
      name: data.name,
      height: data.height,
      weight: data.weight,
      ability: data.abilities[0]?.ability?.name || '',
      image: data.sprites.front_default,
      captured: false,
    };
  }

  modalBody.innerHTML = `
    <img src="${info.image}" alt="${info.name}" style="width:120px;">
    <h2>${info.name}</h2>
    <p><b>Altura:</b> ${info.height}</p>
    <p><b>Peso:</b> ${info.weight}</p>
    <p><b>Habilidad:</b> ${info.ability}</p>
    ${info.captured ? '<div style="color:green;"><b>Capturado</b></div>' : ''}
  `;
  captureBtn.style.display = info.captured ? 'none' : 'inline-block';
  captureBtn.onclick = async () => {
    await fetch(`${BACKEND_URL}/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    modal.style.display = 'none';
    await renderPokedex();
  };
  modal.style.display = 'flex';
}

closeModal.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

renderPokedex();