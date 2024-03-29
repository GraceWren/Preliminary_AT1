document.addEventListener("DOMContentLoaded", function() {
    let currentQuestionIndex = 0;
    const questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
    const content = document.getElementById('content');
    const btn = document.getElementById('revealBtn');

    //Setup timer variables to count seconds
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    //Function called once per second to update the timer display
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
      
    //Format the min and sec values to have a leading zero when required. e.g. 9 => 09
    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            //Get the fields from the database for the current question
            const question = questions[currentQuestionIndex].fields.question_text;
            const answer = questions[currentQuestionIndex].fields.answer_text;
            const question_image = questions[currentQuestionIndex].fields.question_image;
            //Build up the HTML code to display the question. Note the use of Backticks/Grave Accents to define the strings.
            HTMLQuestion = "";
            //if there is an image for this question, then display it before the question.
            if (question_image.length > 0) {
                HTMLQuestion += `<img src="../${question_image}">\n`;
            }
            HTMLQuestion += `<div class='question'>Question: ${question}</div><div class='answer' style='display: none;'> Answer: ${answer}</div>\n`;
            content.innerHTML = HTMLQuestion;
            btn.textContent = "Reveal Answer";
        } else {
            content.innerHTML = "No more questions.";
            btn.style.display = "none";
        }
    }

    displayQuestion();

    //Function called when Next Question or reveal answer button is clicked.
    btn.addEventListener("click", function() {
        const answerElement = content.querySelector('.answer');
        if (btn.textContent === "Reveal Answer") {
            answerElement.style.display = "block";
            btn.textContent = "Next Question";
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    });
});
