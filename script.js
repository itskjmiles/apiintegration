function filterPokemons(generation) {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; 

    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
        .then(response => response.json())
        .then(data => {
            data.pokemon_species.forEach((pokemon, index) => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const pokemonItem = document.createElement('li');
                        pokemonItem.classList.add('pokemon-item', 'visible'); 
                        pokemonItem.innerHTML = `
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" class="pokemon-image" alt="${pokemonData.name}">
                            <p>${pokemonData.name}</p>
                        `;
                        pokemonList.appendChild(pokemonItem);

                        setTimeout(() => {
                            pokemonItem.classList.add('visible');
                        }, index * 100); 
                    })
                    .catch(error => {
                        console.error('Error fetching Pokémon data:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching Pokémon generation data:', error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    fetchPokemons();
});

function fetchPokemons() {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = ''; 

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const pokemonItem = document.createElement('li');
                        pokemonItem.classList.add('pokemon-item');
                        pokemonItem.innerHTML = `
                            <img src="${pokemonData.sprites.front_default}" class="pokemon-image" alt="${pokemonData.name}">
                            <p class="pokemon-name">${pokemonData.name}</p>
                            <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                        `;
                        pokemonList.appendChild(pokemonItem);
                    })
                    .catch(error => {
                        console.error('Error fetching Pokémon data:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching Pokémon list:', error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
});

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetchPokemon(searchInput);
}

function fetchPokemon(searchTerm) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = ''; 
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found!');
            }
            return response.json();
        })
        .then(pokemonData => {
            const pokemonDetailsHTML = `
                <h2>${pokemonData.name}</h2>
                <img src="${pokemonData.sprites.front_default}" class="pokemon-image" alt="${pokemonData.name}">
                <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
            `;
            pokemonDetails.innerHTML = pokemonDetailsHTML;
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
            pokemonDetails.innerHTML = '<p>Pokémon not found!</p>';
        });
}
