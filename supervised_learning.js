var finishedDrawing = false;
var counter = 0;

var keysDown = {};
addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == 13) {
        console.log("Learning");
        learn();
    }

    else if (e.keyCode == 32) {
        console.log("Clearing");
        clear();
    }

    else if (e.keyCode == 16) {
        console.log("Guessing");
        guess();
    }
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

drawFunctionality();

var charactersLearned = new Array(10);
var numberOfCharactersLearned = 0;

function learn() {

    var letter = prompt("What letter is this? (Please write it in capital)");

    if (numberOfCharactersLearned == 0) {
        var character = new Character(letter);
        character.createInputMatrix(grid);
        character.updateWeightMatrix(character.inputMatrix);
        charactersLearned[numberOfCharactersLearned] = character;
        numberOfCharactersLearned++;
    }

    else {
        for (var i = 0; i < numberOfCharactersLearned; i++) {
            if (charactersLearned[i].code == letter) {

                charactersLearned[i].createInputMatrix(grid);
                charactersLearned[i].updateWeightMatrix(charactersLearned[i].inputMatrix);
            }

            else {

                var character = new Character(letter);
                character.createInputMatrix(grid);
                character.updateWeightMatrix(character.inputMatrix);
                charactersLearned[numberOfCharactersLearned] = character;
                numberOfCharactersLearned++;
            }

        }
    }
}

function clear() {

    context.clearRect(300, 300, 60, 80);
    context.clearRect(400, 100, 240, 320);

    for (var i = 0; i < 32; i++) {
        grid[i] = [];
        for (var j = 0; j < 24; j++)
            grid[i][j] = 0;
    }
}


