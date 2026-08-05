const palabras = [
  "methodology",
  "waterfall",
  "agile",
  "scrum",
  "kanban",
  "sprint",
  "backlog",
  "story",
  "devops",
  "pipeline",
  "integration",
  "delivery",
  "retrospective",
  "deliverable",
  "artifact",
  "documentation",
  "debt",
  "risk",
  "mitigation",
  "transparency",
  "adaptation",
  "manager",
  "analyst",
  "tester",
  "administrator",
  "owner",
  "master",
  "environment",
  "ticket",
  "repository",
  "troubleshoot",
  "stakeholder",
  "requirement",
  "feasibility",
  "scope",
  "business",
  "gathering",
  "modeling",
  "elicitation",
  "criteria",
  "constraint",
  "usecase",
  "functional",
  "estimates",
  "resource",
  "architecture",
  "pattern",
  "interface",
  "prototype",
  "database",
  "schema",
  "algorithm",
  "component",
  "modularity",
  "diagram",
  "wireframe",
  "mockup",
  "scalability",
  "security",
  "design",
  "api",
  "code",
  "developer",
  "language",
  "source",
  "backend",
  "frontend",
  "framework",
  "library",
  "version",
  "commit",
  "merge",
  "branch",
  "build",
  "debugging",
  "syntax",
  "compiler",
  "scripting",
  "refactoring",
  "deployment",
  "encoding",
  "testing",
  "quality",
  "bug",
  "defect",
  "testcase",
  "unittest",
  "integrationtest",
  "systemtest",
  "acceptance",
  "regression",
  "performance",
  "load",
  "automation",
  "testplan",
  "severity",
  "priority",
  "validation",
  "verification",
  "release"
];

let palabra = "";
let errores = 0;
let maxErrores = 7;
let letrasCorrectas = [];

const palabraDiv = document.getElementById("palabra");
const tecladoDiv = document.getElementById("teclado");
const mensaje = document.getElementById("mensaje");
const imagenBomba = document.getElementById("imagenBomba");
const reiniciarBtn = document.getElementById("reiniciar");

iniciarJuego();

function iniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];

  errores = 0;
  letrasCorrectas = [];

  mensaje.textContent = "";
  imagenBomba.src = "../static/img/bomba0.png";
  reiniciarBtn.style.display = "none";

  crearPalabra();
  crearTeclado();
}

function crearPalabra() {
  palabraDiv.innerHTML = "";

  palabra.split("").forEach(letra => {
    const div = document.createElement("div");
    div.classList.add("letra");

    if (letrasCorrectas.includes(letra)) {
      div.textContent = letra.toUpperCase();
    } else {
      div.textContent = "";
    }

    palabraDiv.appendChild(div);
  });
}

function crearTeclado() {
  tecladoDiv.innerHTML = "";

  const letras = "abcdefghijklmnopqrstuvwxyz";

  letras.split("").forEach(letra => {
    const boton = document.createElement("button");

    boton.textContent = letra.toUpperCase();

    boton.addEventListener("click", () => {
      manejarLetra(letra, boton);
    });

    tecladoDiv.appendChild(boton);
  });
}

function manejarLetra(letra, boton) {
  boton.disabled = true;

  if (palabra.includes(letra)) {
    letrasCorrectas.push(letra);

    crearPalabra();
    verificarVictoria();
  } else {
    errores++;

    imagenBomba.src = `../static/img/bomba${errores}.png`;

    if (errores >= maxErrores) {
      perder();
    }
  }
}

function verificarVictoria() {
  const gano = palabra
    .split("")
    .every(letra => letrasCorrectas.includes(letra));

  if (gano) {
    mensaje.textContent = "🎉 You won!";
    terminarJuego();
  }
}

function perder() {
  mensaje.textContent =
    `💥 You lost. The word was: ${palabra.toUpperCase()}`;

  imagenBomba.src = "../static/img/bomba7.png";

  terminarJuego();
}

function terminarJuego() {
  const botones = tecladoDiv.querySelectorAll("button");

  botones.forEach(btn => {
    btn.disabled = true;
  });

  reiniciarBtn.style.display = "inline-block";
}

reiniciarBtn.addEventListener("click", iniciarJuego);