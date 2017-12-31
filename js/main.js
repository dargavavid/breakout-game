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

function detectCollision(a, b) {
    var horizontalCollision = false, verticalCollision = false;
    if (a.x + a.width > b.x && a.x < b.x + b.width) {
        horizontalCollision = true;
    }
    if (a.y + a.height > b.y && a.y < b.y + b.height) {
        verticalCollision = true;
    }
    return horizontalCollision && verticalCollision;
}

function handlePaddleBallCollision() {
    var collision = detectCollision(paddle, ball);
    // if (collision && ball.y < paddle.y) {
    //   ball.y = paddle.y - ball.height;
    //   ball.invertDirection(1, -1);
    // }
    var paddleSection = paddle.width / 7;
    if (collision && ball.y < paddle.y) {
        ball.y = paddle.y - ball.height;
        if (ball.x < paddle.x + paddleSection) {
            ball.invertDirection(-1, -1);
        }
        else if (ball.x > paddle.x + paddleSection * 6) {
            ball.invertDirection(-1, -1);
        }
        else {
            ball.invertDirection(1, -1);
        }
    }
}