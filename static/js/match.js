let words = [];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matches = 0;

const board =
    document.getElementById(
        "game-board"
    );

const message =
    document.getElementById(
        "message"
    );

document
    .getElementById(
        "restart-btn"
    )
    .addEventListener(
        "click",
        startGame
    );

/* LOAD JSON */

fetch("../static/data/words.json")

    .then(response =>
        response.json()
    )

    .then(data => {

        words = data;

        startGame();

    })

    .catch(error => {

        console.error(error);

    });

/* START GAME */

function startGame(){

    board.innerHTML = "";

    matches = 0;

    firstCard = null;
    secondCard = null;

    message.textContent = "";

    const selectedWords =

        [...words]

            .sort(
                () =>
                Math.random() - 0.5
            )

            .slice(0, 8);

    let cards = [];

    selectedWords.forEach(word => {

        cards.push({

            text:
                word.termino,

            pair:
                word.termino

        });

        cards.push({

            text:
                word.traduccion,

            pair:
                word.termino

        });

    });

    cards.sort(
        () =>
        Math.random() - 0.5
    );

    cards.forEach(data => {

        const card =
            document.createElement(
                "div"
            );

        card.classList.add(
            "card"
        );

        card.textContent =
            data.text;

        card.dataset.pair =
            data.pair;

        card.addEventListener(
            "click",
            () =>
            selectCard(card)
        );

        board.appendChild(card);

    });

}

/* SELECT CARD */

function selectCard(card){

    if(lockBoard)
        return;

    if(
        card.classList.contains(
            "matched"
        )
    )
        return;

    if(card === firstCard)
        return;

    card.classList.add(
        "selected"
    );

    if(!firstCard){

        firstCard = card;

        return;
    }

    secondCard = card;

    lockBoard = true;

    checkMatch();
}

/* CHECK MATCH */

function checkMatch(){

    const isMatch =

        firstCard.dataset.pair ===
        secondCard.dataset.pair;

    if(isMatch){

        firstCard.classList.remove(
            "selected"
        );

        secondCard.classList.remove(
            "selected"
        );

        firstCard.classList.add(
            "matched"
        );

        secondCard.classList.add(
            "matched"
        );

        matches++;

        resetTurn();

        if(matches === 8){

            message.textContent =
                "You Won!";
        }

    }else{

        setTimeout(() => {

            firstCard.classList.remove(
                "selected"
            );

            secondCard.classList.remove(
                "selected"
            );

            resetTurn();

        }, 700);
    }
}

/* RESET */

function resetTurn(){

    firstCard = null;

    secondCard = null;

    lockBoard = false;
}