const gameBoard = document.getElementById('game-board');
const playerCar = document.getElementById('player-car');

// Lane-er center points (320px width hole center gula hobe: 15, 95, 175, 255)
const lanePositions = [15, 95, 175, 255]; 
let currentLane = 1; // Start in 2nd lane
let score = 0;
let isGameOver = false;

// Initial position set
function updateCarPos() {
    playerCar.style.left = lanePositions[currentLane] + "px";
}
updateCarPos();

// Lane Divider Visuals add kora
for (let i = 1; i < 4; i++) {
    let divider = document.createElement('div');
    divider.className = 'lane-divider';
    divider.style.left = (i * 80) + "px";
    gameBoard.appendChild(divider);
}

// Fixed Lane Jump Logic
function moveLeft() {
    if (currentLane > 0 && !isGameOver) {
        currentLane--;
        updateCarPos();
    }
}

function moveRight() {
    if (currentLane < 3 && !isGameOver) {
        currentLane++;
        updateCarPos();
    }
}

// Controls
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
});

document.getElementById('left-btn').onclick = moveLeft;
document.getElementById('right-btn').onclick = moveRight;

// Enemy Lane Logic
function spawnEnemy() {
    if (isGameOver) return;
    const enemy = document.createElement('div');
    enemy.className = 'enemy-car';
    const randomLane = Math.floor(Math.random() * 4);
    enemy.style.left = lanePositions[randomLane] + "px";
    enemy.style.top = "-100px";
    gameBoard.appendChild(enemy);

    let moveEnemy = setInterval(() => {
        let top = parseInt(enemy.style.top);
        if (top > window.innerHeight) {
            clearInterval(moveEnemy);
            if(gameBoard.contains(enemy)) gameBoard.removeChild(enemy);
            score++;
            document.getElementById('score').innerText = "Score: " + score;
        } else {
            enemy.style.top = (top + 5 + (score/10)) + "px"; // Speed barbe score barle
        }

        if (checkCollision(playerCar, enemy)) {
            isGameOver = true;
            document.getElementById('game-over').classList.remove('hidden');
        }
    }, 20);
}

function checkCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    // Slightly smaller hitbox for better gameplay
    return !(aRect.bottom < bRect.top + 10 || aRect.top > bRect.bottom - 10 || aRect.right < bRect.left + 10 || aRect.left > bRect.right - 10);
}

setInterval(spawnEnemy, 1500);
