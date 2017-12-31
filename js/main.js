var $bg = document.querySelector("#background");
var $fg = document.querySelector("#foreground");
var $gameScoreDiv = document.querySelector("#game-score");
var gameScore = 0;
var ball = new Ball(250, 350, 10, 10, [], -2, -2);
var ballSpeedMax = 5;
var ballSpeedIncrement = 1.05;
var paddle = new Entity(75, $fg.height - 10, 75, 10);