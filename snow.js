const canvas = document.getElementById("winterCanvas");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

//create constructor function for each 'snow' particle
function Particle(x,y, directionX, directionY, size, color){
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

/* Add draw method to particles in order to form them. Each particle will be a
circular shape that resembles snow. */
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillstyle = this.color;
  ctx.fill();
}

/*Add update method to repeatedly draw snow particles and to keep them
in-bounds of the screen */
Particle.prototype.update = function() {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;

  this.draw();
}
//Create particle array to make multiple 'snowflakes' go in random directions
function initArray() {
  particleArray = [];
  for (let i=0; i<100; i++){
    let size = Math.random() * 10;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = (Math.random() * 3) - .5;
    let directionY = (Math.random() * 3) - .5;
    let color = 'white';

    particleArray.push(new Particle(x,y, directionX, directionY, size, color));
  }
}
//Call animation loop
function animateSnow(){
  requestAnimationFrame(animateSnow);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for (let i = 0; i<particleArray.length; i++){
    particleArray[i].update();
  }
}
initArray();
animateSnow();

//Make sure particles properly adjust to window maxSize
window.addEventListener('resize',
  function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initArray();
  }
)
