let words = [];

/* ELEMENTOS */

const searchInput =
    document.getElementById("search-input");

const suggestions =
    document.getElementById("suggestions");

const wordDayCard =
    document.getElementById("word-day-card");

const dailyWord =
    document.getElementById("daily-word");

const dailyTranslation =
    document.getElementById("daily-translation");

const modal =
    document.getElementById("word-modal");

const closeModal =
    document.getElementById("close-modal");

const modalWord =
    document.getElementById("modal-word");

const modalTranslation =
    document.getElementById("modal-translation");

const modalDefinition =
    document.getElementById("modal-definition");

/* CARGAR JSON */

fetch("../static/data/words.json")
    .then(response => response.json())
    .then(data => {

        words = data;

        iniciarAplicacion();
    })
    .catch(error => {

        console.error(
            "Error cargando words.json",
            error
        );
    });

function iniciarAplicacion() {

    configurarPalabraDelDia();

    configurarBuscador();

    configurarModal();
}

/* PALABRA DEL DIA */

function configurarPalabraDelDia() {

    const today =
        new Date();

    const dayNumber =
        Math.floor(
            today.getTime() / 86400000
        );

    const index =
        dayNumber % words.length;

    const currentWord =
        words[index];

    dailyWord.textContent =
        currentWord.termino;

    dailyTranslation.textContent =
        currentWord.traduccion;

    wordDayCard.addEventListener(
        "click",
        () => {

            abrirModal(currentWord);
        }
    );
}

/* BUSCADOR */

function configurarBuscador() {

    searchInput.addEventListener(
        "input",
        () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();

            suggestions.innerHTML =
                "";

            if (!value) {

                return;
            }

            const filtered =
                words.filter(word =>

                    word.termino
                        .toLowerCase()
                        .includes(value)
                    // ← Solo busca en el término principal
                );

            filtered
                .slice(0, 10)
                .forEach(word => {

                    const item =
                        document.createElement(
                            "div"
                        );

                    item.classList.add(
                        "suggestion-item"
                    );

                    item.textContent =
                        `${word.termino} — ${word.traduccion}`;

                    item.addEventListener(
                        "click",
                        () => {

                            abrirModal(word);

                            searchInput.value =
                                word.termino;

                            suggestions.innerHTML =
                                "";
                        }
                    );

                    suggestions.appendChild(
                        item
                    );
                });
        }
    );
}

/* MODAL */

function configurarModal() {

    closeModal.addEventListener(
        "click",
        () => {

            modal.style.display =
                "none";
        }
    );

    window.addEventListener(
        "click",
        e => {

            if (
                e.target === modal
            ) {

                modal.style.display =
                    "none";
            }
        }
    );
}

function abrirModal(word) {

    modal.style.display =
        "flex";

    modalWord.textContent =
        word.termino;

    modalTranslation.textContent =
        word.traduccion;

    modalDefinition.textContent =
        word.definicion;
}