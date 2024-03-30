//Global variables
var questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
var currentQuestionIndex = 0;
var answerArray = []; //Boolean array. T = Answer correct, F = Wrong
for (let i = 0; i < questions.length; i += 1) { //Initiallly set to false
    answerArray.push(false);
}
//Check user answer is correct
function CheckUserAnswer() {
    let uansewer = document.forms["UserAnswerForm"]["UserAnswer"].value;
    //const questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
    let correctanswer = questions[currentQuestionIndex].fields.correctanswer;
    //alert ("User answer: " + uansewer);
    //alert ("Correct answer: " + correctanswer);
    //alert ("Current Q number: " + currentQuestionIndex);
    if (uansewer == correctanswer) {
        alert("Answer is correct");
        answerArray[currentQuestionIndex] = true;
        return false;
    }
    else {
        alert("Answer is wrong. Correct answer is: " + correctanswer);
        answerArray[currentQuestionIndex] = false;
        return false;       
    }
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


document.addEventListener("DOMContentLoaded", function() {
 
    var questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
    const content = document.getElementById('content');
    const btn = document.getElementById('revealBtn');

    //Display current question number
    var CurrentQ = document.getElementById("CurrentQ");
    var MaxQ = document.getElementById("MaxQ");
    MaxQ.innerHTML = questions.length

    //Setup timer variables to count seconds
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    timerId = setInterval(setTime, 1000);

    //Function called once per second to update the timer display
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            //Get the fields from the database for the current question
            let question = questions[currentQuestionIndex].fields.question_text;
            let correctanswer = questions[currentQuestionIndex].fields.correctanswer;
            let answertextA = questions[currentQuestionIndex].fields.answertextA;
            let answertextB = questions[currentQuestionIndex].fields.answertextB;
            let answertextC = questions[currentQuestionIndex].fields.answertextC;
            let answertextD = questions[currentQuestionIndex].fields.answertextD;
            let question_image = questions[currentQuestionIndex].fields.question_image;
            let hasmultiplechoice = questions[currentQuestionIndex].fields.hasmultiplechoice;
            //Build up the HTML code to display the question. Note the use of Backticks/Grave Accents to define the strings.
            HTMLQuestion = "";
            //if there is an image for this question, then display it before the question.
            if (question_image.length > 0) {
                HTMLQuestion += `<img src="../${question_image}">\n`;
            }
            HTMLQuestion += `<div class='question'>Question: ${question}</div>`;
            if (hasmultiplechoice) {
                HTMLQuestion += `<div class='question'>A): ${answertextA}</div>`;
                HTMLQuestion += `<div class='question'>B): ${answertextB}</div>`;
                HTMLQuestion += `<div class='question'>C): ${answertextC}</div>`;
                HTMLQuestion += `<div class='question'>D): ${answertextD}</div>`;
            }
            //Add form for input to get users answer
            HTMLQuestion += `<form name="UserAnswerForm" onsubmit="return CheckUserAnswer()">`;
            HTMLQuestion += `<label for="UserAnswer">Answer:</label><br>`;
            HTMLQuestion += `<input type="text" id="UserAnswer" name="UserAnswer">`
            HTMLQuestion += `<input type="submit" value="Submit"></form><br>`;

            HTMLQuestion += `<div class='answer' style='display: none;'> Answer: ${correctanswer}</div>\n`;
            content.innerHTML = HTMLQuestion;
            btn.textContent = "Reveal Answer";
            CurrentQ.innerHTML = currentQuestionIndex+1
        } else {// show results at end of quiz
            clearInterval(timerId); 
            ResultSummary = "<h1>Results</h1>"
            QuestionsCorrect = 0
            QuestionsIncorrect = 0
            for (let i = 0; i < questions.length; i += 1) { //checking the value of the answer array to display which questions are correct
                DisplayNum = i+1;//i (index) + 1 is used becuase of zero index
                if (answerArray[i] == true) {
                     ResultSummary += "Question " + DisplayNum + ": correct<br>"
                     QuestionsCorrect += 1;
                }
                else {
                    ResultSummary += "Question " + DisplayNum + ": incorrect<br>";
                    QuestionsIncorrect += 1;
                }
            }
            PercentageCorrect = QuestionsCorrect/questions.length*100;
            ResultSummary += "<br><br> Percentage Correct: " + PercentageCorrect + "%";
            content.innerHTML = ResultSummary;

            
        
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
