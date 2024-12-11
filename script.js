
$(document).ready(function () {
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let currentScore = 10;
    let highScore = localStorage.getItem("highScore") || 0;
    let guessHistory = [];

    $(".high-score-value").text(highScore);

    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        currentScore = 10;
        guessHistory = [];
        $(".current-score").text(currentScore);
        $(".high-score-value").text(highScore);
        $(".guess-input").val("").prop("disabled", false);
        $(".message").text("Start guessing...");
        $(".history-list").empty();
        $(".game-panel").css("background", "#d7ccc8");
    }

    function updateMessage(msg) {
        $(".message").text(msg).fadeOut(100).fadeIn(200);
    }

    $(".check-btn").click(function () {
        const guess = Number($(".guess-input").val());
        if (!guess || guess < 1 || guess > 100) {
            updateMessage("Invalid input! Enter a number between 1 and 100.");
        } else if (guessHistory.includes(guess)) {
            updateMessage(`You've already guessed ${guess}. Try something else!`);
        } else if (guess === secretNumber) {
            updateMessage("You win! Congratulations!");
            $(".guess-input").prop("disabled", true);
            $(".game-panel").css("background", "#4caf50");
            if (currentScore > highScore) {
                highScore = currentScore;
                localStorage.setItem("highScore", highScore);
                $(".high-score-value").text(highScore);
            }
        } else {
            guessHistory.push(guess);
            $(".history-list").append(`<li>${guess}</li>`);
            if (currentScore > 1) {
                updateMessage(guess < secretNumber ? "Too low!" : "Too high!");
                currentScore--;
                $(".current-score").text(currentScore);
            } else {
                updateMessage("Game over! Click Reset to try again.");
                $(".current-score").text(0);
                $(".guess-input").prop("disabled", true);
            }
        }
    });

    $(".reset-btn").click(resetGame);

    resetGame();
});
