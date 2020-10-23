//HTML elements
const quizList = document.querySelector('.quiz-list');
const questionNumber = document.querySelector('.question');
const resultDiv = document.querySelector('.result');

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

const questionTwo = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionThree = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionFour = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionFive = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionSix = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionSeven = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionEight = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionNine = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const questionTen = new Question('One', [{text: 'one', correct: 'false'}, 
{text: 'two', correct: 'false'}, 
{text: 'three', correct: 'false'}, 
{text: 'correct', correct: 'true'}]);

const renderQuestions = questionObject => {
    //Update question number
    questionNumber.textContent = `Question ${questionObject.number}:`;

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

renderQuestions(questionOne);