"use strict";

if($('canvas').length) {

    const canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
        x: undefined,
        y: undefined
    }

    let maxRadius = 40;
    let minRadius = 2;

    let colorArray = [
        '#394A59',
        '#486273',
        '#587E8C',
        '#D9A25F',
        '#A67449'
    ];

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

    });
    window.addEventListener('touchstart', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

    });

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    });

    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

        this.update = function () {
            // Visszapattanas x
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            // Visszapattanas y
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            // Interactivitas
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius +=1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -=1;
            }

            this.draw();
        }

    }

    let circleArray = [];

    function init() {

        circleArray = [];

        for (var i=0; i < 800; i++){

            // Size
            let radius = Math.random() * 3 + 1;
            // Start
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            // Speed
            let speed = 1;
            let dx = (Math.random() - 0.5) * speed;
            let dy = (Math.random() - 0.5) * speed;

            circleArray.push(new Circle(x, y, dx, dy, radius));

        }

    }

    function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0, 0, innerWidth, innerHeight);

        for (var i=0; i<circleArray.length; i++) {
            circleArray[i].update();
        }

    }

// Run animation
    init();
    animate();

}