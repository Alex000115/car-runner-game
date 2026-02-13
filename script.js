const car=document.getElementById("playerCar")
const leftBtn=document.getElementById("leftBtn")
const rightBtn=document.getElementById("rightBtn")
const game=document.querySelector(".game")
const scoreText=document.getElementById("score")
const gameOverScreen=document.getElementById("gameOver")
const crashImg=document.getElementById("crashImg")

let x=105
let score=0
let running=true

const enemyCars=[
"https://i.ibb.co/7QpKsCX/car1.png",
"https://i.ibb.co/Z8h8b4B/car2.png",
"https://i.ibb.co/p0K0F5F/car3.png"
]

// movement
function left(){
if(x>0){
x-=52
car.style.left=x+"px"
}
}
function right(){
if(x<210){
x+=52
car.style.left=x+"px"
}
}

leftBtn.onclick=left
rightBtn.onclick=right

document.addEventListener("keydown",e=>{
if(!running)return
if(e.key==="ArrowLeft")left()
if(e.key==="ArrowRight")right()
})

// spawn enemy

function spawn(){
if(!running)return

const e=document.createElement("img")
e.src=enemyCars[Math.floor(Math.random()*enemyCars.length)]
e.classList.add("enemy")

let lane=Math.floor(Math.random()*3)
let pos=[0,105,210]
e.style.left=pos[lane]+"px"
e.style.top="-100px"

game.appendChild(e)

let fall=setInterval(()=>{

if(!running)return clearInterval(fall)

e.style.top=e.offsetTop+6+"px"

if(collide(car,e)) crash()

if(e.offsetTop>600){
e.remove()
clearInterval(fall)
}

},30)
}

setInterval(spawn,1200)

// collision

function collide(a,b){
return !(
a.offsetTop>b.offsetTop+b.offsetHeight||
a.offsetTop+a.offsetHeight<b.offsetTop||
a.offsetLeft>b.offsetLeft+b.offsetWidth||
a.offsetLeft+a.offsetWidth<b.offsetLeft
)
}

// score

setInterval(()=>{
if(!running)return
score++
scoreText.innerText="Score: "+score
},1000)

// crash

function crash(){
running=false
crashImg.src="https://raw.githubusercontent.com/Alex000115/car-runner-game/main/crash.png"
gameOverScreen.classList.remove("hidden")
}

// restart

function restartGame(){
location.reload()
}
