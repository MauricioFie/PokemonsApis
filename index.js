const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 19;

previous.addEventListener('click', () => {
    if(offset != 1) {
        offset -= 20;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener('click', () => {
    offset += 20;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
        console.log(data);
        spinner.style.display = "none";
    });
}

function fetchPokemons(offset, limit){
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}
    
function createPokemon(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");
    
    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("poekemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.append(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    cardBack.appendChild(ProgressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function ProgressBars(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");

    for(let i = 0; i < 3; i++){
        const stat = stats[i];

        const statPercent = stat.base_state / 2 + "%";
        const statContainer = document.createElement('div');
        statContainer.classList.add("stat-container");

        const statName = document.createElement("div");
        statName.textContent = stat.stat.name;

        const Progress = document.createElement("div");
        Progress.classList.add("progress");

        const ProgressBar = document.createElement("div");
        ProgressBar.classList.add("progress-bar");
        ProgressBar.setAttribute("aria-valuenow", stat.base_stat);
        ProgressBar.setAttribute("aria-valuemin", 0);
        ProgressBar.setAttribute("aria-valuemax", 200);
        ProgressBar.style.width = statPercent;

        ProgressBar.textContent = stat.base_stat;

        Progress.appendChild(ProgressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(Progress);
        statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}

function removeChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);