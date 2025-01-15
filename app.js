let userScore = 0 ;
let compScore = 0;
const winningScore = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const newGameBtn = document.querySelector("#new-game-btn"); 

const genComChoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];

};

const drawGame = () => {
    msg.innerText = "Game was Draw! Play Again!!! ";
    msg.style.backgroundColor = "#081b31";


};

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText =  `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText =  `You Lose. ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    checkGameOver();
};

const checkGameOver = () => {
    if (userScore === winningScore || compScore === winningScore) {
        const winner = userScore === winningScore ? "You" : "Computer";
        msg.innerText = `Game Over! The winner is ${winner}.`;
        msg.style.backgroundColor = winner === "You" ? "green" : "red";

        choices.forEach((choice) => choice.removeEventListener("click", handleChoice));

        newGameBtn.style.display = "block";
    }
};


const playGame = (userChoice) => {
    const compChoice = genComChoice();

    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin =true;
        if(userChoice === "rock"){
            //scissors,paper
            userWin = compChoice ==="paper" ? false : true;
        }else if(userChoice === "paper"){
            //rock,scissors
            userWin = compChoice === "scissors" ? false : true;
        }else{
            userWin = compChoice === "rock" ? false :true;
        }
        showWinner(userWin,userChoice,compChoice);
        }
    
};

const handleChoice = (event) => {
    const userChoice = event.currentTarget.getAttribute("id");
    playGame(userChoice);
};

choices.forEach((choice) => choice.addEventListener("click", handleChoice));



newGameBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Game Reset! Start Playing!";
    msg.style.backgroundColor = "#081b31";

    newGameBtn.style.display = "none";

    choices.forEach((choice) => choice.addEventListener("click", handleChoice));
});
