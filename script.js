let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let resetScoresButton = document.querySelector('.reset-scores');
let newGameButton = document.querySelector('.new-btn');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnIndicator = document.querySelector('#turn-indicator');
let scoreX = document.querySelector('#score-x');
let scoreO = document.querySelector('#score-o');
let scoreDraw = document.querySelector('#score-draw');

let turn_o = true;
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
    gameActive = false;
};

const enableboxes = () => {
    const positions = ['Top left', 'Top center', 'Top right', 'Middle left', 'Center', 'Middle right', 'Bottom left', 'Bottom center', 'Bottom right'];
    boxes.forEach((box, index) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('winner', 'x', 'o');
        box.setAttribute('aria-label', `${positions[index]} position`);
    });
    gameActive = true;
};

const updateTurnIndicator = () => {
    if (turnIndicator) {
        turnIndicator.innerText = `Current Turn: ${turn_o ? 'O' : 'X'}`;
        turnIndicator.className = turn_o ? 'turn-o' : 'turn-x';
    }
};

const updateScores = () => {
    if (scoreX) scoreX.innerText = scores.X;
    if (scoreO) scoreO.innerText = scores.O;
    if (scoreDraw) scoreDraw.innerText = scores.draw;
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add('winner');
    });
};

// Confetti effect
const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 3 + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.appendChild(piece);
    }

    document.body.appendChild(confetti);

    setTimeout(() => {
        document.body.removeChild(confetti);
    }, 5000);
};

const show_winner = (winner, pattern) => {
    msg.innerText = `${winner} Wins!`;
    msgcontainer.classList.remove('hide');
    highlightWinningBoxes(pattern);
    scores[winner]++;
    updateScores();
    disableboxes();

    // Create confetti effect
    createConfetti();

    // Play win sound
    playSound(523, 0.3); // C5 note
    setTimeout(() => playSound(659, 0.3), 150); // E5 note
    setTimeout(() => playSound(784, 0.5), 300); // G5 note
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove('hide');
    scores.draw++;
    updateScores();
    disableboxes();

    // Play draw sound
    playSound(440, 0.2);
    setTimeout(() => playSound(330, 0.2), 150);
    setTimeout(() => playSound(220, 0.3), 300);
};

const checkWinner = () => {
    for (let pattern of winningCombinations) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            show_winner(pos1, pattern);
            return true;
        }
    }

    // Check for draw
    const allBoxesFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allBoxesFilled) {
        showDraw();
        return true;
    }

    return false;
};

const resetGame = () => {
    turn_o = true;
    enableboxes();
    msgcontainer.classList.add('hide');
    updateTurnIndicator();
};

const resetScores = () => {
    scores = { X: 0, O: 0, draw: 0 };
    updateScores();
    // Optional: Show a confirmation message
    msg.innerText = "Scores Reset!";
    msgcontainer.classList.remove('hide');
    setTimeout(() => {
        msgcontainer.classList.add('hide');
    }, 2000);
};

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        const box = boxes[index];
        if (box && !box.disabled && gameActive) {
            handleBoxClick(box, index);
        }
    } else if (e.key === 'r' || e.key === 'R') {
        resetGame();
    } else if (e.key === 's' || e.key === 'S') {
        resetScores();
    }
});

// Add sound effects (using Web Audio API)
const playSound = (frequency, duration, type = 'sine') => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        // Silently fail if Web Audio API is not supported
    }
};

const handleBoxClick = (box, index) => {
    if (!gameActive || box.innerText !== "") return;

    const symbol = turn_o ? 'O' : 'X';
    box.innerText = symbol;
    box.classList.add(symbol.toLowerCase());
    box.disabled = true;

    // Update aria-label for accessibility
    const positions = ['Top left', 'Top center', 'Top right', 'Middle left', 'Center', 'Middle right', 'Bottom left', 'Bottom center', 'Bottom right'];
    box.setAttribute('aria-label', `${positions[index]} position: ${symbol}`);

    // Play click sound
    playSound(800, 0.1);

    if (!checkWinner()) {
        turn_o = !turn_o;
        updateTurnIndicator();
    }
};

// Initialize the game
updateTurnIndicator();
updateScores();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
resetScoresButton.addEventListener("click", resetScores);
