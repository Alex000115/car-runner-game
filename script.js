const gameBoard = document.getElementById('game-board');
const playerCar = document.getElementById('player-car');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');

let score = 0;
let carPos = 125; 
let isGameOver = false;

// 1. Create Road Lines
for (let i = 0; i < 6; i++) {
    let line = document.createElement('div');
    line.className = 'line';
    line.style.top = (i * 150) + "px";
    gameBoard.appendChild(line);
}

// 2. Road Lines Animation
function moveLines() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        let top = parseInt(line.style.top);
        if (top >= window.innerHeight) {
            top = -100;
        }
        line.style.top = (top + 7) + "px";
    });
}

// 3. Movement
function moveLeft() {
    if (carPos > 10 && !isGameOver) {
        carPos -= 15;
        playerCar.style.left = carPos + "px";
    }
}

function moveRight() {
    if (carPos < 240 && !isGameOver) {
        carPos += 15;
        playerCar.style.left = carPos + "px";
    }
}

// Controls
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
});

document.getElementById('left-btn').addEventListener('click', moveLeft);
document.getElementById('right-btn').addEventListener('click', moveRight);

// 4. Enemy Management
function createEnemy() {
    if (isGameOver) return;

    const enemy = document.createElement('div');
    enemy.className = 'enemy-car';
    enemy.style.left = Math.floor(Math.random() * 240) + "px";
    enemy.style.top = "-150px";
    gameBoard.appendChild(enemy);

    let enemyInterval = setInterval(() => {
        let enemyTop = parseInt(enemy.style.top);
        
        if (enemyTop > window.innerHeight) {
            clearInterval(enemyInterval);
            if (gameBoard.contains(enemy)) gameBoard.removeChild(enemy);
            score++;
            scoreDisplay.innerText = "Score: " + score;
        } else {
            enemy.style.top = (enemyTop + 6) + "px";
        }

        // Collision Check
        if (detectCollision(playerCar, enemy)) {
            endGame();
            clearInterval(enemyInterval);
        }
    }, 20);
}

function detectCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        aRect.top > bRect.bottom ||
        aRect.bottom < bRect.top ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
}

// Game Intervals
setInterval(() => {
    if (!isGameOver) moveLines();
}, 20);

setInterval(() => {
    if (!isGameOver) createEnemy();
}, 2000);
