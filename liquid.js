const canvas = document.getElementById('summerCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Liquid-waterfall particle constructor
class Particle {
  constructor(x,y,size,weight){
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
  }
  update(){
    if(this.y > canvas.height){
      this.y = 0 - this.size;
      this.x = (Math.random() * 60) + 200;
      this.weight = (Math.random() * 4) + .1;
      this.x = Math.random() * canvas.width;
    }
    this.y += this.weight;
  }
  draw(){
    ctx.fillStyle = 'rgba(128,197,222,1)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const particleArray = [];
const numberOfParticles = 60;

function createParticles(){
  for (let i=0; i<numberOfParticles; i++){
    const x = (Math.random()* 60) + 200;
    const y = (Math.random() * canvas.height);
    const size = (Math.random() * 20) + 5;
    const weight = (Math.random() * 5) + .1;
    particleArray.push(new Particle(x,y,size,weight));
  }
}
createParticles();

//Animate the liquid effect
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i=0; i<particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();

//Resize event to adjust components when page is resized
window.addEventListener('resize',
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
    }
)
