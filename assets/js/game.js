'use strict';

// Constants
// Sizes
const canvasWidth = 480;
const canvasHeight = 270;
const flappyBallRadius = 15;
const pipeWidth = 10;
const pipeHeight = 200;

// Positions
const ballStartPositionX = 10;
const ballStartPositionY = 120;

// Colors
const ballCenterColor = "white";
const ballEdgeColor = "red";
const pipeColor = "green";

let flappyBall;
let pipe;
let pipes = [];
let score;
let gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function startGame() {
    flappyBall = new ball(flappyBallRadius, ballCenterColor, ballEdgeColor, ballStartPositionX, ballStartPositionY);
    pipe = new component(pipeWidth, pipeHeight, pipeColor, 150, 120);
    gameArea.start();
}

function ball(radius, centerColor, edgeColor, x, y) {
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        this.ctx = gameArea.context;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();

        let innerRadius = radius - 10;
        let outerRadius = radius + 10;
        let gradient = this.ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(1, edgeColor);

        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(pipe) {
        let ballLeftEdge = this.x;
        let ballRightEdge = this.x + this.radius;
        let ballTopEdge = this.y;
        let ballBottomEdge = this.y + this.radius;
        let pipeLeftEdge = pipe.x;
        let pipeRightEdge = pipe.x + pipe.width;
        let pipeTopEdge = pipe.y;
        let pipeBottomEdge = pipe.y + pipe.height;
        let crash = true;

        if ((ballBottomEdge < pipeTopEdge) || (ballTopEdge > pipeBottomEdge) || (ballRightEdge < pipeLeftEdge) || (ballLeftEdge > pipeRightEdge)) {
            crash = false;
        }

        return crash;
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        this.ctx = gameArea.context;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function updateGameArea() {
    if (flappyBall.crashWith(pipe)) {
        gameArea.stop();
    } else {
        gameArea.clear();
        pipe.update();
        flappyBall.newPosition();
        flappyBall.update();
    }
}

// Control 
function moveUp() {
    flappyBall.speedY -= 1;
}

function moveDown() {
    flappyBall.speedY += 1;
}

function moveLeft() {
    flappyBall.speedX -= 1;
}

function moveRight() {
    flappyBall.speedX += 1;
}

function stopMove() {
    flappyBall.speedX = 0;
    flappyBall.speedY = 0;
}