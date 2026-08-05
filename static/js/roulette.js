const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let categories = [];
let colors = [];
let rotation = 0;
let wordsData = [];
let selectedWord = null;

fetch("../static/data/words.json")
.then(res => res.json())
.then(data => {

    wordsData = data;

    categories = [
        ...new Set(
            data.map(
                word => word.categoria
            )
        )
    ];

    colors = categories.map((_, index) => {

        const hue =
            (index * 360) /
            categories.length;

        return `hsl(${hue}, 70%, 50%)`;

    });

    drawWheel();

});

function drawWheel(){

    if(categories.length === 0){
        return;
    }

    const arc =
        (2 * Math.PI) /
        categories.length;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    categories.forEach(
        (category, index) => {

        const angle =
            index * arc +
            rotation;

        ctx.beginPath();

        ctx.moveTo(
            250,
            250
        );

        ctx.arc(
            250,
            250,
            240,
            angle,
            angle + arc
        );

        ctx.fillStyle =
            colors[index];

        ctx.fill();

        ctx.save();

        ctx.translate(
            250,
            250
        );

        ctx.rotate(
            angle +
            arc / 2
        );

        ctx.fillStyle =
            "white";

        ctx.font =
            "16px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            category,
            150,
            0
        );

        ctx.restore();

    });

}

document
.getElementById("spinBtn")
.addEventListener(
    "click",
    spinWheel
);

function spinWheel(){

    if(categories.length === 0){
        return;
    }

    const arc =
        (2 * Math.PI) /
        categories.length;

    const winningIndex =
        Math.floor(
            Math.random() *
            categories.length
        );

    const winningCategory =
        categories[winningIndex];

    const turns =
        5 + Math.floor(
            Math.random() * 4
        );

    const targetAngle =
        (Math.PI * 2) -
        (
            winningIndex * arc +
            arc / 2
        );

    const targetRotation =
        rotation +
        (
            turns *
            Math.PI *
            2
        ) +
        (
            targetAngle -
            (
                rotation %
                (
                    Math.PI * 2
                )
            )
        );

    const startRotation =
        rotation;

    const duration =
        5000;

    const startTime =
        performance.now();

    function animate(time){

        const elapsed =
            time - startTime;

        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );

        const easeOut =
            1 -
            Math.pow(
                1 - progress,
                4
            );

        rotation =
            startRotation +
            (
                targetRotation -
                startRotation
            ) *
            easeOut;

        drawWheel();

        if(progress < 1){

            requestAnimationFrame(
                animate
            );

        }else{

            rotation =
                targetRotation;

            drawWheel();

            pickWordFromCategory(
                winningCategory
            );

        }

    }

    requestAnimationFrame(
        animate
    );

}

function pickWordFromCategory(category){

    document
    .getElementById(
        "selectedCategory"
    )
    .textContent =
        category;

    const words =
        wordsData.filter(
            word =>
            word.categoria ===
            category
        );

    if(words.length === 0){
        return;
    }

    selectedWord =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ];

    document
    .getElementById(
        "selectedWord"
    )
    .textContent =
        selectedWord.termino;

}

document
.getElementById("showInfo")
.addEventListener(
    "click",
    () => {

    if(!selectedWord){
        return;
    }

    document
    .getElementById(
        "popupWord"
    )
    .textContent =
        selectedWord.termino;

    document
    .getElementById(
        "popupTranslation"
    )
    .textContent =
        selectedWord.traduccion;

    document
    .getElementById(
        "popupDefinition"
    )
    .textContent =
        selectedWord.definicion;

    document
    .getElementById(
        "popup"
    )
    .style.display =
        "flex";

});

document
.getElementById("closePopup")
.addEventListener(
    "click",
    () => {

    document
    .getElementById(
        "popup"
    )
    .style.display =
        "none";

});

document
.getElementById("popup")
.addEventListener(
    "click",
    (e)=>{

    if(e.target.id === "popup"){

        document
        .getElementById("popup")
        .style.display="none";

    }

});