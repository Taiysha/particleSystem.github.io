const canvas = document.getElementById('springCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numOfParticles = 400;


// Measure title element for collision with rain particles
let titleElement = document.getElementById('rainTitle');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
	x: titleMeasurements.left,
	y: titleMeasurements.top,
	width: titleMeasurements.width,
	height: 1
}

//Constructor class for each particle of rain
class Particle {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.size = Math.random() * 9 + 1;
		this.weight = Math.random() * 1 + 1;
		this.directionX = -1;
	}
	update(){
		if (this.y > canvas.height){
			this.y = 0 - this.size;
			this.weight = Math.random() * 1 + 1;
			this.x = Math.random() * canvas.width * 1.2;
		}
		this.weight += .02;
		this.y += this.weight;
		this.x += this.directionX;

//Check for collision between each raindrop and title element
		if(
			this.x < title.x + title.width &&
			this.x + this.size > title.x &&
			this.y < title.y + title.height &&
			this.y + this.size > title.y
			) {
			this.y -= 3;
			this.weight *= -.3;
		}
	}
//Draw circular pattern for each particle 
	draw(){
		ctx.fillStyle = '#6495ED';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}

//Initialize 400 particles of rain 
function init(){
	for (let i = 0; i < numOfParticles; i++){
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		particlesArray.push(new Particle(x,y))
	}
}
init();

//Create the animation function for a continous loop of rain particles
function animate(){
	ctx.fillStyle = 'rgba(255, 255,255, 0.01)';
	ctx.fillRect(0,0, canvas.width, canvas.height);
	for (let i = 0; i < particlesArray.length; i++){
		particlesArray[i].update();
		particlesArray[i].draw();
	}

	requestAnimationFrame(animate);
}
animate();
