const canvas = document.getElementById('fallCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfParticles = 25;
let particlesArray = [];
const pumpkin = new Image();
pumpkin.src = 'Images/pumpkin.png';


//Constructor class to create a blueprint to produce many pumpkins with different properties
class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speed = Math.random() * 5 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < .5 ? -1 : 1;
}
//Particle animation for rotating pumpkins
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI/360 * this.spin);
        ctx.drawImage(pumpkin, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore();
    }

    update(){
        this.angle += 2;
        if(this.y > canvas.height){
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
          this.size = Math.random() * 100 + 50;
          this.speed = Math.random() * 8 + 1;
        }
        this.y += this.speed;
    }
}
//Create 25 different pumpkins at once
function initPumpkins(){
  for (let i=0; i<numberOfParticles; i++){
    particlesArray.push(new Particle());
  }
}
initPumpkins();

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for (let i=0; i<particlesArray.length; i++){
      particlesArray[i].draw();
      particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();
