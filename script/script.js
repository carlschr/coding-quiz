//HTML elements
const timer = document.querySelector('#time');
const highScores = document.querySelector('.highscores');
const quizList = document.querySelector('.quiz-list');
const quizItems = document.querySelector('.answer');
const questionNumber = document.querySelector('.question');
const resultDiv = document.querySelector('.result');

//Timer count
let count = 60;

//Question class with constructor function that takes a number and an array of answer objects
class Question {
    constructor(number, answers) {
        this.number = number;
        this.answers = answers;
    }
};

//Each question will use the above class
const questionOne = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionTwo = new Question('Two', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'true'}, 
{text: 'correct', correct: 'false'}]);

const questionThree = new Question('Three', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'true'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionFour = new Question('Four', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionFive = new Question('Five', [{text: 'one', correct: 'true'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionSix = new Question('Six', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'true'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'false'}]);

const questionSeven = new Question('Seven', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionEight = new Question('Eight', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionNine = new Question('Nine', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'true'}, 
{text: 'correct', correct: 'false'}]);

const questionTen = new Question('Ten', [{text: 'one', correct: 'true'}, 
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
    //Set timer to start time
    timer.textContent = count;

    //Set welcome text
    questionNumber.textContent = 'Welcome to the Coding Quiz!';

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
    startButton.setAttribute('class', 'answer');
    startButton.setAttribute('id', 'start-button');
    startListItem.append(startButton);
    
    //Initial result text used to direct attention to the start button
    resultDiv.textContent = 'Press the button above to start.';

    //Renders first question and starts timer upon hitting start
    //If the timer reaches zero, the quiz ends and the score is rendered
    startButton.addEventListener('click', () => {
        renderQuestions(questionOne);
        let timeStart = setInterval(() => {
            count--;
            timer.textContent = count;
            if (count <= 0 || questionCount === 10) {
                clearInterval(timeStart);
                renderScore();
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
    
    //Conditional for nextButton functionality
    //If the user has finished the quiz the button render the score screen
    if (questionCount === 9) {
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

    //Increment question tracker
    questionCount++;

    //Update question number
    questionNumber.textContent = `Question ${questionObject.number}:`;

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

const renderScore = () => {
    //Set timer to zero
    count = 0;
    timer.textContent = count;

    //Set score screen text
    questionNumber.textContent = 'Time\'s up! Submit your score below.'
    quizList.innerHTML = '';
    resultDiv.textContent = 'Enter your name above and submit your score.';
};

//Initial render
renderStartButton();