let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let newGameButton = document.querySelector('.new-btn');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn_o = true;

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const show_winner = (winner) => {
    msg.innerText = `${winner} is the winner!`;
    msgcontainer.classList.remove('hide');
    disableboxes();
};

const checkWinner = () => {
    for (let pattern of winningCombinations) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            show_winner(pos1);
            return;
        }
    }
};

const resetGame = () => {
    turn_o = true;
    enableboxes();
    msgcontainer.classList.add('hide');
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn_o) {
            box.innerText = 'O';
            turn_o = false;
        } else {
            box.innerText = 'X';
            turn_o = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
