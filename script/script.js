//HTML elements
const timer = document.querySelector('#time');
const highScores = document.querySelector('.highscores');
const quizList = document.querySelector('.quiz-list');
const quizItems = document.querySelector('.answer');
const questionNumber = document.querySelector('.question');
const questionContent = document.querySelector('.question-content');
const resultDiv = document.querySelector('.result');

//Timer count
let count = 60;

//Question class with constructor function that takes a number and an array of answer objects
class Question {
    constructor(number, question, answers) {
        this.number = number;
        this.question = question;
        this.answers = answers;
    }
};

//Each question will use the above class
const questionOne = new Question('One', 'Which of these is a syntactically-sound function expression in JavaScript?', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionTwo = new Question('Two', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'true'}, 
{text: 'correct', correct: 'false'}]);

const questionThree = new Question('Three', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'true'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionFour = new Question('Four', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionFive = new Question('Five', '', [{text: 'one', correct: 'true'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionSix = new Question('Six', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'true'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionSeven = new Question('Seven', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionEight = new Question('Eight', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionNine = new Question('Nine', '', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'true'}, 
{text: 'correct', correct: 'false'}]);

const questionTen = new Question('Ten', '', [{text: 'one', correct: 'true'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);
//End of questions

//As the questions are rendered the questionCount will increment
//When the next button is clicked it will render the currently indexed question
const questions = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen];
let questionCount = 0;

//Function to render start button and quiz info
const renderStartButton = () => {
    //Enable highscores button
    highScores.removeAttribute('disabled');

    //Clear quiz list html
    quizList.innerHTML = '';

    //Reset timer
    count = 60;

    //Reset questionCount
    questionCount = 0;

    //Set timer to start time
    timer.textContent = count;

    //Set welcome text
    questionNumber.textContent = 'Welcome to the Coding Quiz!';

    //Delete question text
    questionContent.textContent = '';

    //Create and append quiz info
    let infoDiv = document.createElement('li');
    infoDiv.innerHTML = '<p class="info">Welcome to the coding quiz. The format of the quiz is multiple-choice and you will have one minute to complete the quiz. For every wrong answer we will subtract five seconds from the timer at the top-right corner of the screen. After you have selected the correct answer, the "next" button will appear below the answers. Feel free to log your score at the end of the quiz. Good luck!</p>';
    quizList.append(infoDiv);

    //Create and append lit item for start button
    let startListItem = document.createElement('li');
    quizList.append(startListItem);

    //Create and append start button
    let startButton = document.createElement('button');
    startButton.textContent = 'Press me to start the coding quiz.';
    startButton.setAttribute('class', 'answer next');
    startButton.setAttribute('id', 'start-button');
    startListItem.append(startButton);
    
    //Initial result text used to direct attention to the start button
    resultDiv.textContent = 'Press the button above to start.';

    //Renders first question and starts timer upon hitting start
    //If the timer reaches zero, the quiz ends and the score is rendered
    startButton.addEventListener('click', () => {
        //Disable highscores button
        highScores.setAttribute('disabled', '');

        renderQuestions(questionOne);

        let timeStart = setInterval(() => {
            count--;
            timer.textContent = count;
            if (count <= 0) {
                clearInterval(timeStart);
                renderScore();
            } else if (questionCount === 10) {
                clearInterval(timeStart);
            };
        }, 1000);
    });
};

//Function for disabling and coloring buttons
const disableButtons = buttons => {
    buttons.forEach(button => {
        button.setAttribute('disabled', '');
        button.setAttribute('class', 'answer red');
    });
};

//Function to render next button beneath the answers
const renderNextButton = () => {
    //Create next button
    let nextButton = document.createElement('button');
    nextButton.setAttribute('class', 'answer next');

    //Increment question tracker
    questionCount++;
    
    //Conditional for nextButton functionality
    //If the user has finished the quiz the button render the score screen
    if (questionCount === 10) {
        nextButton.textContent = 'Submit for Score.'

        //Add listener to move to score screen
        nextButton.addEventListener('click', () => {
            renderScore();
        });
    } else {
        nextButton.textContent = '>>>>>>>>>>> Next Question >>>>>>>>>>>';

        //Add listener to move to next question
        nextButton.addEventListener('click', () => {
            renderQuestions(questions[questionCount]);
        });
    };

    //Append next button
    quizList.append(nextButton);
};

//Function for rendering questions
const renderQuestions = questionObject => {
    //Clear previous render
    quizList.innerHTML = '';

    //Update question number
    questionNumber.textContent = `Question ${questionObject.number}:`;
    questionContent.textContent = `${questionObject.question}`;

    //Loop through the answer array
    questionObject.answers.forEach(answer => {
        //Create and append <li> child to quizList
        let newListItem = document.createElement('li');
        quizList.append(newListItem);

        //Create and append <button> child to <li>
        let newAnswer = document.createElement('button');
        newAnswer.textContent = answer.text;
        newAnswer.setAttribute('data-correct', answer.correct);
        newAnswer.setAttribute('class', 'answer');
        newListItem.appendChild(newAnswer);

        newAnswer.addEventListener('click', (event) => {
            if (event.currentTarget.getAttribute('data-correct') === 'true') {
                //Change wrong answers to red and correct answer to green
                disableButtons(document.querySelectorAll('.answer'));
                event.currentTarget.setAttribute('class', 'answer green');
        
                resultDiv.textContent = 'Correct!';

                //Renders the next button
                renderNextButton();
            } else {
                //Change wrong answer to red
                event.currentTarget.setAttribute('class', 'answer red');
                event.currentTarget.setAttribute('disabled', '');
                //Subtract five seconds from timer
                count -= 5;
                timer.textContent = count;

                resultDiv.textContent = 'Nope.';
            };
        });
    });

    //Set result text to a neutral state
    resultDiv.textContent = 'Awaiting answer...';
};

//Function for rendering the score form
const renderScore = () => {
    //Set timer to zero
    count = 0;
    timer.textContent = count;

    //Set score screen text
    questionNumber.textContent = 'Time\'s up! Submit your score below.'

    //Delete question text
    questionContent.textContent = '';

    quizList.innerHTML = '';
    
    resultDiv.textContent = 'Enter your name above and submit your score.';

    quizList.innerHTML = "<form><label for='name'>Name:</label><input id='name' type='text' name='name'/><input id='submit' type='submit' name='submit' value='Submit'/></form>"

    document.querySelector('#submit').addEventListener('click', (event) => {
        event.preventDefault();
        let storageNum = localStorage.length;
        localStorage.setItem(`score${storageNum}`, JSON.stringify([document.querySelector('#name').value, questionCount]));
        renderStartButton();
    });
};

//Function for returning top five or less high scores
const getTopFiveScores = () => {
    //Container arrays for the data as it's parsed and organized
    let allScores = [];
    let orderedScores = [];
    let topFiveScores = [];

    //Pushes all relevant localStorage data to an array
    for (let data in localStorage) {
        if (data.includes('score')) {
            allScores.push(JSON.parse(localStorage.getItem(data)));
        };
    };

    //Recursive function to move the data from allScores to orderedScores 
    // in order of highest score to lowest score
    const moveHighest = () => {
        for (let i = 0; i < allScores.length; i++) {
            let passed = true;
            for (let j = 0; j < allScores.length; j++) {
                if (allScores[i][1] < allScores[j][1]) {
                    passed = false;
                };
            };
            if (passed) {
                orderedScores.push(allScores[i]);
                allScores.splice(i, 1);
                moveHighest();
            };
        };
    };
    //Function call for number sort
    moveHighest();

    //Pushes top five or less scores from orderedScores to topFiveScores
    if (orderedScores.length > 5) {
        for (let i = 0; i < 5; i++) {
            topFiveScores.push(orderedScores[i]);
        };
    } else {
        for (let i = 0; i < orderedScores.length; i++) {
            topFiveScores.push(orderedScores[i]);
        };
    };

    return topFiveScores;
}; 

//Function for rendering the top five scores
const renderHighScores = () => {
    const topFive = getTopFiveScores();

    quizList.innerHTML = '';

    questionNumber.textContent = 'The Top Five:';

    resultDiv.textContent = 'Check out these top scorers!';

    topFive.forEach(score => {
        let newScoreItem = document.createElement('li');
        quizList.append(newScoreItem);

        let newScoreButton = document.createElement('button');
        newScoreButton.textContent = `${topFive.indexOf(score) + 1}. ${score[0]}: ${score[1]} points`;
        newScoreButton.setAttribute('class', 'answer');
        newScoreButton.setAttribute('disabled', '');
        newScoreItem.append(newScoreButton);
    });
};

//Initial render
renderStartButton();

//Highscores click event
highScores.addEventListener('click', () => {
    if (highScores.getAttribute('data-function') === 'score-list') {
        highScores.textContent = 'Return';
        highScores.setAttribute('data-function', 'return');
        renderHighScores();
    } else {
        highScores.textContent = 'View highscores';
        highScores.setAttribute('data-function', 'score-list');
        renderStartButton();
    };
})