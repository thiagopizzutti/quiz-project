const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const questionCounterText = document.getElementById("questionCounter")
const scoreText = document.getElementById("score")
console.log(questionCounterText);
console.log(scoreText);


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
        choice1: "Cryptocurrencies",
        choice2: "They are contracts to be signed in paper",
        choice3: "Financial Services",
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

const CORRECT_ANSWER_TEN_POINTS = 10
const MAX_NUMBER_OF_QUESTIONS = 10
const TIMER = 5


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    // console.log(availableQuestions);
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_NUMBER_OF_QUESTIONS)
        return window.location.assign('/end.html')

    questionCounter++ //start counter quiz
    questionCounterText.innerText = `${questionCounter}/${MAX_NUMBER_OF_QUESTIONS}`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            console.log(selectedChoice, selectedAnswer);

        }, 1000)


    })
})

startGame()