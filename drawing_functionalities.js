"use strict";
var canvas = document.getElementById('workstation');
var context = canvas.getContext("2d");
context.strokeStyle = "#000000";

var grid = [];
var canDraw = false;

context.beginPath();
context.lineWidth = 1;
context.rect(300, 300, 60, 80);
context.stroke();

context.beginPath();
context.lineWidth = 1;
context.rect(400, 100, 240, 320);
context.stroke();

context.beginPath();
context.font = "32px Roboto";
context.fillStyle = "#129178";
context.fillText("Neural Network for Character Recognition", 10, 50);
context.closePath();

context.beginPath();
context.font = "16px Roboto";
context.fillStyle = "#000000";
context.fillText("Press Enter to teach the system this input", 10, 750);
context.fillText("Press Space to clear the input", 10, 770);
context.fillText("Press Shift to let the system guess this input", 10, 790);
context.closePath();


function drawFunctionality() {

    for (var i = 0; i < 32; i++) {
        grid[i] = [];
        for (var j = 0; j < 24; j++)
            grid[i][j] = 0;
    }

    canvas.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("myBtn").click();
        }
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', drawActivate);
    canvas.addEventListener('mouseup', drawDeActivate);

    function drawActivate(e) {
        canDraw = true;
    }

    function drawDeActivate(e) {
        canDraw = false;
    }

    function draw(e) {
        if (canDraw
            && (event.clientX - canvas.offsetLeft) > 300
            && (event.clientX - canvas.offsetLeft) < 360
            && (event.clientY - canvas.offsetTop) > 300
            && (event.clientY - canvas.offsetTop) < 380) {
            var xDraw = event.clientX - canvas.offsetLeft;
            var yDraw = event.clientY - canvas.offsetTop;

            var x = (xDraw - 300) / 6 * 24 + 100;
            var y = (yDraw - 300) / 8 * 32 + 100;


            context.beginPath();
            context.arc(xDraw, yDraw, 3, 0, 2 * Math.PI);
            context.fill();

            context.fillRect(300 + Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
            grid[Math.floor((xDraw - 300) / 60 * 24)][Math.floor((yDraw - 300) / 80 * 32)] = 1;
        }

        return grid;
    }
}

