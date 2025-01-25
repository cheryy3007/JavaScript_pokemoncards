import pokemons from "./pokemons.js";
const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy");
const searchButton = document.getElementById("searchButton");

function generator(pokemon) {
    pokemonContainer.innerHTML = ""; // очищаем контейнер
    pokemon.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-name", pokemon.name); // добавляем data-name для покемона
        card.innerHTML = `
            <div class="header">${pokemon.id}</div>
            <div class="name">${pokemon.name}</div>
            <div class="image">
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
            <div class="type">${pokemon.type.join(" ")}</div>
            <div class="info">Candy count: ${pokemon.candy}</div>
            <div class="info">${pokemon.weight} kg</div>
            <div class="weaknesses">${pokemon.weaknesses.join(' ')}</div>
            <div class="time">${pokemon.spawn_time}</div>
        `;
        pokemonContainer.appendChild(card);
    });
}

function filter() {
    let filteredPokemons = pokemons;

    // Поиск по имени
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery)
        );
    }

    // Фильтрация по типу
    const selectedType = filterType.value;
    if (selectedType && selectedType !== "all") {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.type.some(type => type.toLowerCase() === selectedType.toLowerCase())
        );
    }

    // Сортировка
    if (sortBy.value === "alphabeticalAsc") {
        filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === "alphabeticalDesc") {
        filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy.value === "weightAsc") {
        filteredPokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    } else if (sortBy.value === "weightDesc") {
        filteredPokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    }

    generator(filteredPokemons);
}

// Изначально отображаем всех покемонов
generator(pokemons);

// Добавляем обработчики событий для поиска, фильтрации и сортировки
searchButton.addEventListener("click", filter);
filterType.addEventListener("change", filter); // Слушаем изменение в фильтре типов
sortBy.addEventListener("change", filter); // Слушаем изменение в сортировке
