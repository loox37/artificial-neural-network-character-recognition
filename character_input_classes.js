/**
 * Class Character
 */

// Character.prototype = new Character;
// Character.prototype.constructor = Character;



var Character = function (code) {

    this.code = code;
    this.inputMatrix = new Array(24);
    this.weightMatrix = new Array(24);

    for (var i = 0; i < 24; i++) {

        this.inputMatrix[i] = new Array(32);
        this.weightMatrix[i] = new Array(32);
        for (var j = 0; j < 32; j++) {
            this.inputMatrix[i][j] = 0;
            this.weightMatrix[i][j] = 0;
        }
    }
}


Character.prototype.code = "";
Character.prototype.inputMatrix = new Array(24);
Character.prototype.weightMatrix = new Array(24);

Character.prototype.createInputMatrix = function (drawn_grid) {

    for (var i = 0; i < 24; i++) {

        this.inputMatrix[i] = [];
        for (var j = 0; j < 32; j++) {

            if (drawn_grid[i][j] == 1)
                this.inputMatrix[i][j] = 1;
            else if (drawn_grid[i][j] == 0)
                this.inputMatrix[i][j] = -1;
        }
    }

}


Character.prototype.updateWeightMatrix = function (inputMatrix) {

    for (var i = 0; i < 24; i++) {

        for (var j = 0; j < 32; j++) {

            this.weightMatrix[i][j] += inputMatrix[i][j];
        }
    }
}


/**
 * Class Input
 */
// Input.prototype = new Input;
// Input.prototype.constructor = Input;

var Input = function (grid) {

    for (var i = 0; i < grid.length; i++) {

        this.grid[i] = [];

        for (var j = 0; j < grid[0].length; j++) {

            this.grid[i][j] = grid[i][j];
        }
    }
}

Input.prototype.grid = [];
Input.prototype.candidateScore = 0;
Input.prototype.idealWeightModelScore = 0;
Input.prototype.recognitionQuotient = 0;
Input.prototype.recognition_list = [];


Input.prototype.calculate_CandidateScore = function (char) {

    var psi = 0;

    for (var i = 0; i < 24; i++) {

        for (var j = 0; j < 32; j++) {
            if (!isNaN(char.weightMatrix[i][j]))
                psi += char.weightMatrix[i][j] * this.grid[i][j];
        }
    }

    this.candidateScore = psi;
}

Input.prototype.calculate_idealWeightModelScore = function (char) {

    var mu = 0;

    for (var i = 0; i < 24; i++) {

        for (var j = 0; j < 32; j++) {

            if (!isNaN(char.weightMatrix[i][j])) {
                if (char.weightMatrix[i][j] > 0) {
                    mu += char.weightMatrix[i][j];
                }
            }
        }
    }

    this.idealWeightModelScore = mu;

}

Input.prototype.calculate_RecognitionQuotient = function (char) {

    this.calculate_CandidateScore(char);
    this.calculate_idealWeightModelScore(char);
    var Q = this.candidateScore / this.idealWeightModelScore;
    this.recognitionQuotient = Q;
    this.recognition_list.push([char.code, this.recognitionQuotient]);
}