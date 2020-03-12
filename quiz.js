const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const questionCounterText = document.getElementById("questionCounter")
const scoreText = document.getElementById("score")
const timerCountDown = document.getElementById("question-counter")
const correctAnswer = new Audio()
const wrongAnswer = new Audio()
const winSound = new Audio()
correctAnswer.src = "audio.wav"
wrongAnswer.src = "wrongAnswer.mp3"
winSound.src = "won.wav"


// const timerCountDown = document.getElementById("question-counter")
// console.log(timerCountDown);




let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{

        /* Question 1 */
        question: "Who is the creator of Bitcoin?",
        choice1: "Satoshi Nakamoto",
        choice2: "Charlie Lee",
        choice3: "Vitalik Buterin",
        choice4: "Elon Musk",
        answer: 1

    },
    /* Question 2 */
    {
        question: "When was Bitcoin first created?",
        choice1: "1990",
        choice2: "1970",
        choice3: "2008",
        choice4: "2015",
        answer: 3

    },

    /* Question 3 */
    {
        question: "What are the main use cases for Blockchain technology?",
        choice1: "Cryptocurrencies",
        choice2: "Smart Contracts",
        choice3: "Financial Services",
        choice4: "All of the above",
        answer: 4

    },
    /* Question 4 */
    {
        question: "What is Bitcoin?",
        choice1: "A distributed network",
        choice2: "A digital private bank",
        choice3: "A Financial Institution",
        choice4: "A fiat currency",
        answer: 1
    },

    /* Question 5 */
    {
        question: "What best describes Smart Contracts?",
        choice1: " Is a self-executing contract with the terms of the agreement between buyer and seller",
        choice2: "Smart contracts render transactions traceable, transparent, and irreversible",
        choice3: "Is a computer protocol",
        choice4: "All of the above",
        answer: 4
    },

    /* Question 6 */
    {
        question: "Which option is an example of smart contract Blockchain?",
        choice1: "Nano",
        choice2: "Ethereum",
        choice3: "Ripple",
        choice4: "Binance",
        answer: 2
    },

    /* Question 7 */
    {
        question: "Where can you buy cryptocurrencies?",
        choice1: "From banks",
        choice2: "From government ",
        choice3: "From exchanges",
        choice4: "From a software company",
        answer: 3
    },

    /* Question 8 */
    {
        question: "Which technology below is an example of a private blockchain?",
        choice1: "Ripple",
        choice2: "Litecoin",
        choice3: "Bitcoin",
        choice4: "Bitcoin Cash",
        answer: 1
    },

    /* Question 9 */
    {
        question: "What is the difference between Blockchain and Bitcoin?",
        choice1: "They are the same",
        choice2: "The Bitcoin protocol is built on the blockchain ",
        choice3: "The value of Bitcoin is higher than the Blockchain",
        choice4: "One is money, while the other is a technology",
        answer: 2
    },

    /* Question 10 */

    {
        question: "How can Blockchain technology help economies?",
        choice1: "It can't",
        choice2: "It will destroy economies",
        choice3: "By giving different solutions, from financial to social services ",
        choice4: "By selling its products",
        answer: 3

    }
]


// const myObject = (Object.keys(questions[9]))
// console.log(myObject[1], myObject[2], myObject[3], myObject[4]);

const CORRECT_ANSWER_TEN_POINTS = 10;
const MAX_NUMBER_OF_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]

    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_NUMBER_OF_QUESTIONS || incrementScore > 10) {

        let finalScore = document.querySelector('.final-score')
        finalScore.style.transform = "translateX(0)";

        let finalPageScore = document.querySelector(".final-page-score")
        finalPageScore.innerHTML = score

        winSound.play()


        //  return window.location.assign('/end.html')
    }


    questionCounter++ //start counter quiz
    questionCounterText.innerText = `${questionCounter}/${MAX_NUMBER_OF_QUESTIONS}`
    console.log(questionCounter);
    console.log(questionCounterText);


    /* SELECT QUESTIONS RANDOMLY */
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    /* ANSWERS OPTION */
    choices.sort(() => Math.random() - 0.5).forEach((choice, index) => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
        // choice.innerText = currentQuestion["choice" + (index + 1)]

    })

    /* ATTEMPT TO RANDOM ANSWERS */
    // console.log(choices);
    // const answerIndex = Math.floor(Math.random() * choices.length)
    // answerIndex.innerText = currentQuestion["choice"]
    // console.log(answerIndex);


    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}


/* SELECT CORRECT AND INCORRECT */
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers)
            return
        acceptingAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]


        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        if (classToApply === "correct") {
            correctAnswer.play()
        } else {
            wrongAnswer.play()
        }

        incrementScore(CORRECT_ANSWER_TEN_POINTS)
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1200)
    })
})


/* FUNCTION TO INCREMENTO MY SCORES */
incrementScore = num => {
    score += num;
    scoreText.innerText = score
    console.log(score);
}


/* FUNCTION TO SET TIME REMAINING */

const timeLeft = 120
let time = timeLeft

setInterval(updateCountDown, 1000)

function updateCountDown() {
    if (time >= 0) {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        timerCountDown.innerText = `${seconds}`
        time--
    }

}
startGame()