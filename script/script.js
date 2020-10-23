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