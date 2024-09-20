const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const restartButton = document.getElementById("restart");

const story = {
    start: {
        text: "Você está na entrada de uma floresta misteriosa. Dois caminhos se apresentam: um à esquerda, envolto em névoa, e outro à direita, iluminado por uma luz suave.",
        choices: {
            left: "Ir à esquerda",
            right: "Ir à direita"
        },
        next: {
            left: "leftPath",
            right: "rightPath"
        }
    },
    leftPath: {
        text: "Você se aproxima de um lago encantado. A água brilha sob a luz da lua. Você pode mergulhar e explorar ou voltar e escolher o outro caminho.",
        choices: {
            swim: "Mergulhar",
            back: "Voltar"
        },
        next: {
            swim: "lakeAdventure",
            back: "start"
        }
    },
    rightPath: {
        text: "Você encontra um dragão adormecido, suas escamas brilham como estrelas. Você pode tentar roubar um tesouro ou sair silenciosamente.",
        choices: {
            steal: "Roubar o tesouro",
            sneak: "Sair silenciosamente"
        },
        next: {
            steal: "gameOver",
            sneak: "victory"
        }
    },
    lakeAdventure: {
        text: "Enquanto você mergulha, encontra um tridente mágico! Ele brilha com uma luz azul e você sente um poder imenso. Você pode usá-lo para fazer um desejo ou voltar à superfície.",
        choices: {
            wish: "Fazer um desejo",
            back: "Voltar à superfície"
        },
        next: {
            wish: "victoryWish",
            back: "start"
        }
    },
    victory: {
        text: "Você escapou da floresta com um tesouro! Você venceu!",
        choices: {},
        next: {}
    },
    victoryWish: {
        text: "Seu desejo foi atendido! Você se torna o guardião da floresta, protegido por suas magias!",
        choices: {},
        next: {}
    },
    gameOver: {
        text: "Você tomou uma decisão ruim e foi capturado. Tente novamente.",
        choices: {},
        next: {}
    }
};

let currentNode = story.start;

function displayStory(node) {
    storyElement.innerText = node.text;
    choicesElement.innerHTML = "";

    for (const [key, value] of Object.entries(node.choices)) {
        const button = document.createElement("button");
        button.innerText = value;
        button.onclick = () => handleChoice(key);
        choicesElement.appendChild(button);
    }

    restartButton.classList.add("hidden");
}

function handleChoice(choice) {
    const nextNodeKey = currentNode.next[choice];

    if (nextNodeKey) {
        currentNode = story[nextNodeKey];
        displayStory(currentNode);
    } else {
        restartButton.classList.remove("hidden");
        restartButton.onclick = restartGame;
    }
}

function restartGame() {
    currentNode = story.start;
    displayStory(currentNode);
}

displayStory(currentNode);
