const wordList = [
    {
        word: "javascript",
        hint: "Scripting language for web development"
    },
    {
        word: "nodejs",
        hint: "JavaScript runtime for server-side development"
    },
    {
        word: "html",
        hint: "Markup language for creating web pages"
    },
    {
        word: "css",
        hint: "Stylesheet language for styling web pages"
    },
    {
        word: "react",
        hint: "JavaScript library for building user interfaces"
    },
    {
        word: "python",
        hint: "High-level programming language used for various applications"
    },
    {
        word: "api",
        hint: "Application Programming Interface, defines interactions between software components"
    },
    {
        word: "git",
        hint: "Version control system for tracking changes in source code"
    },
    {
        word: "database",
        hint: "Structured collection of data, often stored and accessed using SQL"
    },
    {
        word: "java",
        hint: "Object-oriented programming language used for building enterprise-level applications"
    },
    {
        word: "rest",
        hint: "Representational State Transfer, an architectural style for designing networked applications"
    },
    {
        word: "json",
        hint: "JavaScript Object Notation, lightweight data interchange format"
    },
    {
        word: "devops",
        hint: "Collaborative approach between Development and Operations teams to automate processes"
    },
    {
        word: "containerization",
        hint: "Encapsulating an application and its dependencies into a container for efficient deployment"
    },
    {
        word: "agile",
        hint: "Software development methodology emphasizing iterative and incremental development"
    },
    {
        word: "scrum",
        hint: "Framework for Agile development, emphasizing teamwork, accountability, and iterative progress"
    },
    {
        word: "cybersecurity",
        hint: "Practices and measures to protect systems, networks, and data from digital attacks"
    },
    {
        word: "angular",
        hint: "JavaScript framework for building single-page applications"
    },
    {
        word: "sql",
        hint: "Structured Query Language, used for managing and manipulating relational databases"
    },
    {
        word: "backend",
        hint: "Server-side of an application responsible for processing business logic and data storage"
    },
    {
        word: "frontend",
        hint: "Client-side of an application responsible for the user interface and user experience"
    },
    {
        word: "cloud",
        hint: "Delivery of computing services over the internet, including storage, processing, and more"
    },
    {
        word: "docker",
        hint: "Platform for automating the deployment of applications within lightweight, portable containers"
    },
    {
        word: "graphql",
        hint: "Query language and runtime for APIs, designed to provide a more efficient alternative to REST"
    },
];

const hangmanImage = document.querySelector(".hangman-box img")
const wordDisplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard")
const gameModal = document.querySelector(".modal")
const playAgainButton = document.querySelector(".play-again")

let currentWord,correctLetters, wrongGuessCounter;
const maxGuesses = 6;

const resetGame = () =>{
    //Réinitialisation des variables et du jeu et de l'interface
    correctLetters= [];
    wrongGuessCounter=0
    hangmanImage.src = `images/hangman-${wrongGuessCounter}.svg`
    guessesText.innerText = `${wrongGuessCounter} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
}

const getRandomWord = ()=>{
    //selection de mot aléatoire
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText= hint
    resetGame();
}

const gameOver = (isWon)=>{
    //affichage de la modal
    setTimeout(()=>{
        const modalText = isWon ? `You guessed the word :` : `The Correct word was :`;
        gameModal.querySelector("img").src= `images/${isWon ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isWon ? 'Congratulations!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    }, 300)
}

const initGame = (button, clickedLetter) => {
    //verification de l'existence de lettre dans le mot
    if (currentWord.includes(clickedLetter)){
        //mise à jour du display avec la lettre cliquée et ajout d'une classe pour indiquer qu'elle est
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }else{
        //Si la lettre est fausse, mis a jour du compteur et de l'image du hangman
        wrongGuessCounter++;
        hangmanImage.src = `images/hangman-${wrongGuessCounter}.svg`
    }
    //la lettre ne peut pas etre cliqué 2 fois si elle est fausse
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCounter} / ${maxGuesses}`;

    //appel de la fonction gameOver pour ces 2 evenements
    if(wrongGuessCounter === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
//Creation du clavier
for (let i= 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainButton.addEventListener("click",getRandomWord);