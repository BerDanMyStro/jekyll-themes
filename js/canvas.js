"use strict";

const canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fill();
    }
    
    this.update = function () {
        // Visszacsapodás x
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Visszacsapodás y
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}

let circleArray = [];

for (var i=0; i < 100; i++){

    // Size
    let radius = 30;
    // Start
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    // Speed
    let speed = 16;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;

    circleArray.push(new Circle(x, y, dx, dy, radius));

}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }

}

// Run animation
animate();