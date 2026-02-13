const car = document.getElementById("playerCar");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const game = document.querySelector(".game");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let carX = 125;
let score = 0;
let gameRunning = true;

// move car
function moveLeft(){
  if(carX > 0){
    carX -= 25;
    car.style.left = carX + "px";
  }
}
function moveRight(){
  if(carX < 250){
    carX += 25;
    car.style.left = carX + "px";
  }
}

// mobile buttons
leftBtn.onclick = moveLeft;
rightBtn.onclick = moveRight;

// keyboard
document.addEventListener("keydown", e=>{
  if(!gameRunning) return;
  if(e.key==="ArrowLeft") moveLeft();
  if(e.key==="ArrowRight") moveRight();
});

// spawn enemies
function spawnEnemy(){
  if(!gameRunning) return;

  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random()*6)*50 + "px";
  enemy.style.top = "-80px";

  game.appendChild(enemy);

  let fall = setInterval(()=>{
    if(!gameRunning) return clearInterval(fall);

    enemy.style.top = enemy.offsetTop + 5 + "px";

    if(checkCollision(car, enemy)){
      endGame();
    }

    if(enemy.offsetTop > 500){
      enemy.remove();
      clearInterval(fall);
    }

  },30);
}

setInterval(spawnEnemy,1200);

// collision detect
function checkCollision(a,b){
  return !(
    a.offsetTop > b.offsetTop + b.offsetHeight ||
    a.offsetTop + a.offsetHeight < b.offsetTop ||
    a.offsetLeft > b.offsetLeft + b.offsetWidth ||
    a.offsetLeft + a.offsetWidth < b.offsetLeft
  );
}

// score system
setInterval(()=>{
  if(!gameRunning) return;
  score++;
  scoreText.textContent = "Score: " + score;
},1000);

// game over
function endGame(){
  gameRunning=false;
  gameOverScreen.classList.remove("hidden");
}
