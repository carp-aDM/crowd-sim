const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

const roomWidth = 600;
const roomHeight = 400;

class Agent {
    constructor(x, y) {
        this.position = {x,y};
        this.velocity = {x:5, y:5};
        this.radius = 20;
    }
    
    update() {
        let nextX = this.position.x + this.velocity.x;
        let nextY = this.position.y + this.velocity.y; // next centre coords

        let hitWall = false;
        
        // check if wall is ahead
        const noPoints = 8;
        for (let i = 0; i < noPoints; i++) {
            let angle = (i/noPoints) * 2*Math.PI;

            let checkX = nextX + Math.cos(angle) * this.radius; // next circumference coords
            let checkY = nextY + Math.sin(angle) * this.radius;

            let nextPixel = ctx.getImageData(checkX, checkY, 1, 1).data; // get colour of px ahead

            // check if next pixel is black (3 is opacity)
            if (nextPixel[0] === 0 && nextPixel[1] === 0 && nextPixel[2] === 0 && nextPixel[3] > 0) {
                hitWall = true;
                break;
            }
        }

        if (hitWall) {
            this.velocity.x*=-1; // reverse direction
            this.velocity.y*=-1;
        } else {
            this.position.x = nextX;
            this.position.y = nextY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#60a873'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

const Adam = new Agent(150, 200);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // draw room
    ctx.lineWidth = 3;
    ctx.strokeRect((canvas.width-roomWidth)/2, (canvas.height-roomHeight)/2, roomWidth, roomHeight);
    
    // draw agent
    ctx.lineWidth = 1;
    Adam.update();
    Adam.draw(ctx);
    requestAnimationFrame(animate);
}

animate();
