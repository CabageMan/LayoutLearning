'use strict';

// Constants
// Sizes
const canvasWidth = 480;
const canvasHeight = 270;
const flappyBallRadius = 15;
const pipeWidth = 10;
const pipeMinHeight = 20;
const pipeMaxHeight = 200;
const pipesMinGap = 50;
const pipesMaxGap = 200;

// Positions
const ballStartPositionX = 10;
const ballStartPositionY = 120;

// Colors
const ballCenterColor = "white";
const ballEdgeColor = "red";
const pipeColor = "green";


let flappyBall;
let pipes = [];
let score;
let gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNumber = 0;
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
    score = new component("30px", "Consolas", "black", 280, 40, "text");
    gameArea.start();
}

function ball(radius, centerColor, edgeColor, x, y) {
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        let ctx = gameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        let innerRadius = radius - 10;
        let outerRadius = radius + 10;
        let gradient = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(1, edgeColor);

        ctx.fillStyle = gradient;
        ctx.fill();
    }
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(pipe) {
        let ballLeftEdge = this.x - this.radius;
        let ballRightEdge = this.x + this.radius;
        let ballTopEdge = this.y - this.radius;
        let ballBottomEdge = this.y + this.radius;
        let pipeLeftEdge = pipe.x;
        let pipeRightEdge = pipe.x + pipe.width;
        let pipeTopEdge = pipe.y;
        let pipeBottomEdge = pipe.y + pipe.height;

        return !((ballBottomEdge < pipeTopEdge) || (ballTopEdge > pipeBottomEdge) || (ballRightEdge < pipeLeftEdge) || (ballLeftEdge > pipeRightEdge));
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        let ctx = gameArea.context;
        ctx.fillStyle = color;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function checkInterval(intervalNumber) {
    if ((gameArea.frameNumber / intervalNumber) % 1 == 0) { return true; }
  return false;
    // return gameArea.frameNumber == intervalNumber
}

function updateGameArea() {

    for (let i = 0; i < pipes.length; i++) {
        if (flappyBall.crashWith(pipes[i])) {
            gameArea.stop();
            return;
        }
    }
    gameArea.clear();
    gameArea.frameNumber++;
    
    if (gameArea.frameNumber == 1 || checkInterval(150)) {
        let xPosition = gameArea.canvas.width;
        let height = Math.floor(Math.random() * (pipeMaxHeight - pipeMinHeight + 1) + pipeMinHeight);
        let gap = Math.floor(Math.random() * (pipesMaxGap - pipesMinGap + 1) + pipesMinGap);
        pipes.push(new component(pipeWidth, height, pipeColor, xPosition, 0));
        pipes.push(new component(pipeWidth, xPosition - height - gap, pipeColor, xPosition, height + gap));
    }
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x--;
        pipes[i].update();
    }

    score.text = "SCORE: " + gameArea.frameNumber;
    score.update();

    flappyBall.newPosition();
    flappyBall.update();
}

// Control 
function moveUp() {
    flappyBall.speedY--;
}

function moveDown() {
    flappyBall.speedY++;
}

function moveLeft() {
    flappyBall.speedX--;
}

function moveRight() {
    flappyBall.speedX++;
}

function stopMove() {
    flappyBall.speedX = 0;
    flappyBall.speedY = 0;
}