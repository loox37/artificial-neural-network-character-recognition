function guess() {

    var input = new Input(grid);

    for (var i = 0; i < numberOfCharactersLearned; i++) {

        input.calculate_RecognitionQuotient(
            charactersLearned[i]
        );

    }

    var highestRecognitionCharacter = input.recognition_list[0][0];
    var highestRecognition = input.recognition_list[0][1];
    for (var i = 1; i < input.recognition_list.length; i++) {

        if (input.recognition_list[0][1] > highestRecognition) {
            highestRecognition = input.recognition_list[i][1];
            highestRecognitionCharacter = input.recognition_list[i][0];
        }

    }

    alert("This seems to be the letter: " + highestRecognitionCharacter);

}