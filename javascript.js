var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var startbutton = document.getElementById("startscreen");
var gameover = document.getElementById("gameover");
var rest = document.getElementById("restart");
canvas.textStyle = "black";
function start() {
  canvas.style.display = "block"; 
  gameover.style.display = "none";
  gameon();

 
 

}


function res() {
  location.reload();
}

function winner() {
  if (score1 > score2) {
    document.getElementById("gametext").innerHTML = "Player 1 wins";
  
   }
   else if (score2 > score2 ){
    document.getElementById("gametext").innerHTML = "Player 2 wins";

   }
}

 




function gameon () {
gameover.style.display = "none";
startbutton.style.display = "none";
//canvas height variables


canvas.height = 500;
canvas.width = 1000;
var width = canvas.width;
var height = canvas.height;

//variables for the objects
var x = 500;
var y = Math.floor(Math.random() * height);
var xv = 3;
var yv = 1;
var r = 10;
//functions for keyup and keydown
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


let uppress= false;
let downpress = false;
let apress = false;
let zpress = false;
class ball {
constructor(x,y,r,xv,yv){
    this.x = x;
    this.y = y;
    this.r = r,
    this.xv = xv;
    this.yv = yv;
}

 drawcircle(ctx) {
    
    

  let neon = ctx.createLinearGradient(0,0,170,0);
  
 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    //ctx.strokeStyle = "white";
    //ctx.stroke();
    
   
    ctx.shadowBlur = 20;
    ctx.shadowColor = "green";
    ctx.fillStyle = "green";
    ctx.fill();

    


 
   
    
    
}
bounce(){
   this.drawcircle(ctx);
      this.x += this.xv;
     this.y += this.yv;

    if(this.y - this.r < 0) {
        this.yv = -this.yv;
    }
    if (this.y + this.r > height) {
        this.yv = -this.yv;
    }
   

}
}
class Paddle{
    constructor(xcor,ycor,b,h){
        this.xcor = xcor;
        this.ycor = ycor;
        this.b = b;
        this.h = h;
    }
    
    draw() {
        var canvas2 = document.getElementById("mycanvas");

        var ctx2 = canvas2.getContext("2d");

      
        const shape1 = ctx2.rect(this.xcor,this.ycor, this.b,this.h);
        ctx2.fillStyle = "green";
        ctx2.fill();
        ctx2.stroke();
        ctx2.closePath();
        

        
        
    }
 
}

function dis(x1,y1,x2,y2) {
  let xdist = x2 -x1;
  let ydist = y2 - y1;
  return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist,2));


}

function updateball(){
    requestAnimationFrame(updateball);
    ctx.clearRect(0,0,width,height);
    b1.bounce();
  

    if (col() ||col1() ) {
      b1.xv *= -1;
    }


    
  

}

//collision detection functions
   
function col() {
  var distX = Math.abs(b1.x - Player2.xcor - Player2.b/2);
  var distY = Math.abs(b1.y - Player2.ycor - Player2.h/2);
  if (distX > (Player2.b/2 + b1.r)) { return false; }
  if (distY > (Player2.h/2 + b1.r)) { return false; }


  if (distX <= (Player2.b/2)) { return true; } 
  if (distY <= (Player2.h/2)) { return true; }


}

function col1() {
  var distX = Math.abs(b1.x - Player1.xcor - Player1.b/2);
  var distY = Math.abs(b1.y - Player1.ycor - Player1.h/2);
  if (distX > (Player1.b/2 + b1.r)) { return false; }
  if (distY > (Player1.h/2 + b1.r)) { return false; }


  if (distX <= (Player1.b/2)) { return true; } 
  if (distY <= (Player1.h/2)) { return true; }
}


const Player1 = new Paddle(30,30,20,90);

const Player2 = new Paddle(width - 60,304,20,90);
function players() {
    requestAnimationFrame(players);
    Player2.draw();
    Player1.draw();
   

}
var score1 = 00;
var score2 = 00;



//score function
function score() {
  requestAnimationFrame(score);
  ctx.font = "80px Georgia";
  ctx.fillText(score1,300,48);
  ctx.font = "80px Georgia";
  ctx.fillText(score2,600,48);

  if(b1.x > 1000) {
    score1 += 1;
    b1.x = 500;
    b1.y = 250;
    b1.xv = -4;
  }
  if(b1.x < 0) {
    score2 += 1;
    b1.x = 500;
    b1.y = 250;
    b1.xv = -4;
  }
  if (score2 === 8) {
    ctx.clearRect(0,0,width,height);
    document.getElementById("gametext").innerHTML = "Player 2 wins";
    canvas.style.display = "none";
    gameover.style.display = "block";
    rest.style.display = "block";
  
  }
  if (score1 === 8) {
    ctx.clearRect(0,0,width,height);
    document.getElementById("gametext").innerHTML = "Player 1 wins";
    canvas.style.display = "none";
    gameover.style.display = "block";
    rest.style.display = "block";
    
    
    
  }

}
//Making it so the paddles move when certain keys are pressed, player1 should move when a and z is pressed 
//player2 when up and down keys are pressed
function keyDownHandler(event) {
    if (event.keyCode === 38) {
      uppress = true;
      Player2.ycor -= 34;
      if (Player2.ycor < 0) {
        Player2.ycor = 0;
      }
    } else if (event.keyCode === 40) {
        downpress = true;
        Player2.ycor += 34;
        if (Player2.ycor > 420) {
          Player2.ycor = 420;
        }
    }
    if (event.keyCode === 65) {
      apress= true;
      Player1.ycor -= 34;
      if (Player1.ycor < 0) {
        Player1.ycor = 0;
      }
    } else if (event.keyCode === 90) {
      zpress = true;
      Player1.ycor += 34;
      if (Player1.ycor > 420) {
        Player1.ycor = 410;
      }
    }
  }


  function keyUpHandler(event) {
    if (event.keyCode === 38) {
      uppress = false;
    } else if (event.keyCode === 40) {
        downpress = false;
    }
    if (event.keyCode === 65) {
      apress= false;
    } else if (event.keyCode === 90) {
      zpress = false;
      
    }
  }


 

 //creating the ball object 
const b1 = new ball(x,y,r,xv,yv);
//drawing the ball and making the function so the paddles will show up after being erased by the updateballfunction
b1.drawcircle(ctx);
updateball();
players();
score();


}

