const MS_TO_SEC = 0.001;
const GRAVITY = 98;

// Get the canvas element and its 2D context
const canvas = document.getElementById('portfolioCanvas');
const context = canvas.getContext('2d');

// Set the canvas size to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the rectangle properties
const squareSize = 50;
const playerColor = '#00FF00'; // Green color

let horizontalInputAxis = 0;
let verticalInputAxis = 0;

let movementSpeed = 200;

class Vec2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Player
{
    constructor(position)
    {
        this.position = position;
    }

    applyGravity(deltaTime)
    {
        this.position.y += GRAVITY * deltaTime;
    }

    move(step)
    {
        this.position.x += step.x;
        this.position.y += step.y;
    }

    limitToScreen(frameStartPosition)
    {
        if (this.position.y >= (canvas.height - squareSize)
            || this.position.y <= 0)
            this.position.y = frameStartPosition.y;

        if (this.position.x >= (canvas.width - squareSize)
            || this.position.x <= 0)
            this.position.x = frameStartPosition.x;
    }
}

class Time
{
    constructor()
    {
        this.frameStart = 0;
        this.frameEnd = 0;
        this.deltaTime = 0;
    }

    calculateDelta()
    {
        this.deltaTime = (this.frameStart - this.frameEnd) * MS_TO_SEC;
    }
}

function handleKeyUp(event)
{
    const keyCode = event.keyCode;

    if (keyCode === 37 || keyCode === 65
        || keyCode === 39 || keyCode === 68)
        horizontalInputAxis = 0;

    if (keyCode === 38 || keyCode === 87
        || keyCode === 40 || keyCode === 83)
        verticalInputAxis = 0;
}

function handleKeyDown(event)
{
    const keyCode = event.keyCode;

    if (keyCode === 37 || keyCode === 65)
        horizontalInputAxis = -1;
    else if (keyCode === 39 || keyCode === 68)
        horizontalInputAxis = 1;

    if (keyCode === 38 || keyCode === 87)
        verticalInputAxis = -1;
    else if (keyCode === 40 || keyCode === 83)
        verticalInputAxis = 1;
}

const startingPosition = new Vec2(
    (canvas.width - squareSize) / 2,
    (canvas.height - squareSize) / 2
);

function drawPlayer()
{
    context.fillStyle = playerColor;
    context.fillRect(player.position.x, player.position.y, squareSize, squareSize);
}

function update()
{
    // Clear the canvas
    gameTime.frameStart = performance.now();
    gameTime.calculateDelta();

    context.clearRect(0, 0, canvas.width, canvas.height);

    const frameStartPlayerPosition = new Vec2(player.position.x, player.position.y);
    const step = new Vec2(
        horizontalInputAxis * movementSpeed * gameTime.deltaTime,
        verticalInputAxis * movementSpeed * gameTime.deltaTime
    );

    player.move(step);
    player.applyGravity(gameTime.deltaTime);
    player.limitToScreen(frameStartPlayerPosition);

    drawPlayer();

    gameTime.frameEnd = performance.now();
    // Call the next frame
    requestAnimationFrame(update);
}



document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

let gameTime = new Time();
let player = new Player(startingPosition);

requestAnimationFrame(update);
