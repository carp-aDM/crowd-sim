const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

class Agent {
    constructor(x, y) {
        this.position = {x,y};
        this.velocity = {x:1, y:1};
        this.radius = 40;
    }
    
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx) {
        ctx.fillStyle = '#60a873'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

const Adam = new Agent(100, 100);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Adam.update();
    Adam.draw(ctx);
    requestAnimationFrame(animate);
}

animate();
