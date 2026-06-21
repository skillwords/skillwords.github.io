let words = [];
let currentCategory = "all";
const cardsContainer = document.getElementById("cards-container");

/* LOAD JSON */
fetch("../static/data/words.json")
    .then(response => response.json())
    .then(data => {
        words = data;
        renderCards(words);
    })
    .catch(error => {
        console.error("Error loading words.json:", error);
    });

/* CREATE CARDS */
function renderCards(wordsToRender) {
    cardsContainer.innerHTML = "";
    if (wordsToRender.length === 0) {
        cardsContainer.innerHTML = `
            No results found
        `;
        return;
    }
    wordsToRender.forEach(word => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.category = word.categoria;
        card.textContent = word.termino;
        card.addEventListener("click", () => {
            openPopup(word);
        });
        cardsContainer.appendChild(card);
    });
}

/* OPEN MODAL */
function openPopup(word) {
    document.getElementById("popup-word").textContent = word.termino;
    document.getElementById("popup-translation").textContent = word.traduccion;
    document.getElementById("popup-description").textContent = word.definicion;
    document.getElementById("popup").style.display = "flex";
}

/* CLOSE MODAL */
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* CLOSE CLICKING OUTSIDE */
window.addEventListener("click", event => {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        closePopup();
    }
});

/* CATEGORY FILTER */
function filterCategory(category) {
    currentCategory = category;
    filterCards();
}

/* SEARCH + FILTER + SORT */
function filterCards() {
    const searchValue = 
        document.getElementById("searchInput").value.toLowerCase().trim();

    let filtered = words.filter(word => {
        const matchesSearch = 
            word.termino.toLowerCase().includes(searchValue);  // ← Solo busca en el término principal

        const matchesCategory = 
            currentCategory === "all" || 
            word.categoria === currentCategory;

        return (matchesSearch && matchesCategory);
    });

    const sortType = document.getElementById("sortSelect").value;

    if (sortType === "asc") {
        filtered.sort((a, b) => a.termino.localeCompare(b.termino));
    } else if (sortType === "desc") {
        filtered.sort((a, b) => b.termino.localeCompare(a.termino));
    }

    renderCards(filtered);
}

/* Búsqueda en tiempo real */
document.getElementById("searchInput").addEventListener("input", filterCards);