var $bg = document.querySelector("#background");
var $fg = document.querySelector("#foreground");
var $gameScoreDiv = document.querySelector("#game-score");
var gameScore = 0;
var ball = new Ball(250, 350, 10, 10, [], -2, -2);
var ballSpeedMax = 5;
var ballSpeedIncrement = 1.05;
var paddle = new Entity(75, $fg.height - 10, 75, 10);

//Define interactions:
function updateBallLocation() {
    ball.updateLocation.call(ball);
}

function handleBoundaries() {
    if (ball.x < 0) {
        ball.x = 0; //Reset ball's x coordinate inside of boundary.
        ball.invertDirection(-1, 1); //Bounce the ball back.
    }
    if (ball.x + ball.width > $fg.width) {
        ball.x = $fg.width - ball.width; //Reset ball's x coordinate inside of boundary.
        ball.invertDirection(-1, 1);
    }
    if (ball.y < 0) {
        ball.y = 0; //Reset ball's y coordinate inside of boundary.
        ball.invertDirection(1, -1);
    }
}