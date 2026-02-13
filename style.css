body{
margin:0;
background:#111;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:sans-serif;
}

.phone{
width:300px;
height:600px;
background:black;
border:8px solid #333;
border-radius:40px;
display:flex;
justify-content:center;
align-items:center;
}

.game{
position:relative;
width:260px;
height:520px;
overflow:hidden;
background:#222;
border-radius:20px;
}

/* road */

#road{
position:absolute;
width:100%;
height:100%;
background:
repeating-linear-gradient(
to bottom,
#444 0px,
#444 60px,
#333 60px,
#333 120px
);
animation:road 0.4s linear infinite;
}

@keyframes road{
from{background-position-y:0}
to{background-position-y:120px}
}

/* lane line */

#road::after{
content:"";
position:absolute;
left:50%;
top:0;
width:6px;
height:100%;
background:
repeating-linear-gradient(
to bottom,
white 0px,
white 30px,
transparent 30px,
transparent 60px
);
transform:translateX(-50%);
}

/* cars */

#playerCar{
position:absolute;
bottom:20px;
left:105px;
width:50px;
}

.enemy{
position:absolute;
width:50px;
}

/* controls */

.controls{
position:absolute;
bottom:10px;
width:100%;
display:flex;
justify-content:space-between;
}

button{
font-size:22px;
padding:8px 18px;
border:none;
border-radius:8px;
}

/* score */

#score{
position:absolute;
top:5px;
left:10px;
color:white;
font-weight:bold;
}

/* crash screen */

#gameOver{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.9);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:20px;
}

#gameOver img{
width:180px;
}

.hidden{
display:none;
}
