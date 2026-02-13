const gameBoard = document.getElementById('game-board');
const playerCar = document.getElementById('player-car');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');

// 4-Lane positions calculation (320px board, each lane 80px)
// Centers: 15px, 95px, 175px, 255px (approx)
const lanePositions = [15, 95, 175, 255]; 
let currentLane = 1; // Starting lane
let score = 0;
let isGameOver = false;

// Initialize Player
function updatePlayer() {
    playerCar.style.left = lanePositions[currentLane] + "px";
}
updatePlayer();

// Create Lane Dividers visually
for (let i = 1; i < 4; i++) {
    const divider = document.createElement('div');
    divider.className = 'lane-line';
    divider.style.left = (i * 80) + "px";
    gameBoard.appendChild(divider);
}

// Movement Logic
function moveLeft() {
    if (currentLane > 0 && !isGameOver) {
        currentLane--;
        updatePlayer();
    }
}

function moveRight() {
    if (currentLane < 3 && !isGameOver) {
        currentLane++;
        updatePlayer();
    }
}

// Keyboard Listeners
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
});

// Mobile/Touch Button Listeners
document.getElementById('left-btn').addEventListener('click', moveLeft);
document.getElementById('right-btn').addEventListener('click', moveRight);

// Enemy Spawning
function spawnEnemy() {
    if (isGameOver) return;

    const enemy = document.createElement('div');
    enemy.className = 'enemy-car';
    
    // Pick a random lane (0 to 3)
    const randomLane = Math.floor(Math.random() * 4);
    enemy.style.left = lanePositions[randomLane] + "px";
    enemy.style.top = "-100px";
    gameBoard.appendChild(enemy);

    let enemySpeed = 5 + (score / 15); // Speed increases with score

    let moveEnemy = setInterval(() => {
        if (isGameOver) {
            clearInterval(moveEnemy);
            return;
        }

        let top = parseInt(enemy.style.top);
        
        if (top > window.innerHeight) {
            clearInterval(moveEnemy);
            if (gameBoard.contains(enemy)) gameBoard.removeChild(enemy);
            score++;
            scoreDisplay.innerText = "Score: " + score;
        } else {
            enemy.style.top = (top + enemySpeed) + "px";
        }

        // Collision Check
        if (checkCollision(playerCar, enemy)) {
            endGame();
        }
    }, 20);
}

function checkCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    
    // Adding small padding for more forgiving collision
    return !(
        aRect.bottom < bRect.top + 10 || 
        aRect.top > bRect.bottom - 10 || 
        aRect.right < bRect.left + 10 || 
        aRect.left > bRect.right - 10
    );
}

function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
}

// Spawn an enemy every 1.5 seconds
setInterval(spawnEnemy, 1500);
