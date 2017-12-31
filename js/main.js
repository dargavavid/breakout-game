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

function handleGameOver() {
    if (ball.y > $fg.height) {
        location.reload(); //Reload page/restart game.NOTE: upgrade later to endgame screen.
    }
}

function initBlocks(rows, columns) {
    var blocks = [];
    var blockColors = ["white", "blue", "green", "gold"];
    var gap = 5;
    var blockWidth = ($fg.width - gap * columns - gap) / columns;
    var blockHeight = ($fg.height / 2) / rows;
    var currentX = gap, currentY = gap;
    var block;
    for (var i = 0, counter = 1; i < rows * columns; i++ , counter++) {
        block = new Block(currentX, currentY, blockWidth, blockHeight, 1, blockColors);
        blocks.push(block);
        if (counter % columns === 0) {
            currentX = gap;
            currentY += blockHeight + gap;
        }
        else {
            currentX += blockWidth + gap;
        }
    }
    return blocks;
}

function setBlocksPattern(blocks, pattern) {
    if (blocks.length !== pattern.length) {
        throw new Error("Blocks and pattern arrays must be of equal length.");
    }
    else {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].type = pattern[i];
        }
    }
}

function handleBlockBallCollision() {
    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
        var block = blocks_1[_i];
        if (block.type > 0) {
            if (detectCollision(block, ball)) {
                //Award points, handle special events:
                var points = calculatePoints(block.type);
                incrementGameScore(points);
                updateGameScoreDiv(gameScore);
                increaseBallSpeed();
                //Make block disappear, bounce ball, end loop (no more block collision in this frame).
                block.type = 0;
                ball.invertDirection(1, -1);
                break;
            }
        }
    }
}

function calculatePoints(type) {
    var points = type === 1 ? 10 : type === 2 ? 25 : type === 3 ? 100 : 500;
    return points;
}

function incrementGameScore(amount) {
    gameScore += amount;
}

function updateGameScoreDiv(score) {
    var singles = score % 10;
    var tens = Math.floor(score / 10) % 10;
    var hundreds = Math.floor(score / 100) % 10;
    var thousands = Math.floor(score / 1000) % 10;
    var tenthousands = Math.floor(score / 10000) % 10;
    var hundredthousands = Math.floor(score / 100000) % 10;
    $gameScoreDiv.innerText = "" + hundredthousands + tenthousands + thousands + hundreds + tens + singles;
}

function increaseBallSpeed() {
    if (Math.abs(ball.vx) <= ballSpeedMax && Math.abs(ball.vy) <= ballSpeedMax) {
        ball.vx *= ballSpeedIncrement;
        ball.vy *= ballSpeedIncrement;
    }
}

function rwSelection(rarities) {
    var randNum = Math.random();
    var denominator = rarities.reduce(function (sum, x) { return sum += x; }, 0);
    for (var i = 0; i < rarities.length; i++) {
        randNum -= rarities[i] / denominator;
        if (randNum <= 0) {
            return i;
        }
    }
}

function createRandomPattern(size, min, max) {
    var pattern = [];
    var randNum;
    for (var i = 0; i < size; i++) {
        // randNum = Math.floor(Math.random() * (max - min) + min);
        randNum = rwSelection(blockRarities);
        pattern.push(randNum);
    }
    return pattern;
}