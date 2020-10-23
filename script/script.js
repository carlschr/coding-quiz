//HTML elements
const timer = document.querySelector('#time');
const highScores = document.querySelector('.highscores');
const quizList = document.querySelector('.quiz-list');
const questionNumber = document.querySelector('.question');
const resultDiv = document.querySelector('.result');

//Timer count
let count = 120;

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

const renderStartButton = () => {
    //Set timer to start time
    timer.textContent = count;

    //Set welcome text
    questionNumber.textContent = 'Welcome to the Coding Quiz!';

    //Create and append quiz info
    let infoDiv = document.createElement('li');
    infoDiv.innerHTML = '<p class="info">Welcome to the coding quiz. The format of the quiz is multiple-choice and you will have two minutes to complete the quiz. For every wrong answer we will subtract five seconds from the timer at the top-right corner of the screen. After you have selected the correct answer, the "next" button will appear below the answers. Feel free to log your score at the end of the quiz. Good luck!</p>';
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
};

//Function for rendering of questions
const renderQuestions = questionObject => {
    //Clear previous render
    quizList.innerHTML = '';

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
    });

    //Set result text to a neutral state
    resultDiv.textContent = 'Awaiting answer...';
};

//Initial render
renderStartButton();

const start = document.querySelector('#start-button');

//Renders first question and starts timer upon hitting start
//If the timer reaches zero, the quiz ends and the score is rendered
start.addEventListener('click', () => {
    renderQuestions(questionOne);
    let timeStart = setInterval(() => {
        count--;
        timer.textContent = count;
        if (count === 0) {
            timeStart.clearInterval();
            //renderScore();
        };
    }, 1000);
});