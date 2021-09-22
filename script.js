const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();

newGuess.addEventListener("keyup", checkKey);
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);
let triesCounter = 0;

function newRandom(){
    $.ajax({
        url: "rand.php",
        type: "POST",
        success: function(data){
            console.log(data);
            theGuess = JSON.parse(data)[0];
            console.log(theGuess);
        }
    });
}   

function checkKey(e){
    if ((e.code === "Enter" || e.code === "NumpadEnter") && !newGuess.hasAttribute("readonly")) {
    checkGuess();
    }
}

function checkGuess(){
    newGuess.focus();
    let result = processGuess(newGuess.value);
    if (result === "win" || result === "lost") {
        checkButton.style.visibility = "hidden";
        restartButton.style.visibility = "visible";
        restartButton.focus();
    }
}

function processGuess(newValue){
    let userGuess = parseInt(newValue);
    newGuess.value = "";
    if (isNaN(userGuess)) {
        message.textContent = "Äþóôå áñéèìü!";
        message.style.backgroundColor = "var(--msg-wrong-color)";
    } else if (userGuess>=1 && userGuess<=100){
        if (previousGuesses.indexOf(userGuess)=== -1) {
            triesCounter += 1;
            previousGuesses.push(userGuess);
            lowHigh.textContent = "Ðñïçãïýìåíåò ðñïóðÜèåéåò: " + previousGuesses.join(" ");
            if (triesCounter <= 10) {
                if (userGuess === theGuess) {
                    message.textContent = "ÌðñÜâï, ôï âñÞêáôå!";
                    message.style.backgroundColor = "var(--msg-win-color)";
                    newGuess.setAttribute("readonly", "");
                    return "win";
                } else if (triesCounter === 10) {
                    message.textContent = "ÔÝëïò ðáé÷íéäéïý, ÷Üóáôå!";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                    newGuess.setAttribute("readonly", "");
                    return "lost";
                } else if (userGuess > theGuess) {
                    message.textContent = "ËÜèïò, åßíáé ìéêñüôåñï.";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                } else {
                    message.textContent = "ËÜèïò, åßíáé ìåãáëýôåñï.";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                }
            }
        } else {
            message.textContent = "¸÷åôå Þäç âÜëåé áõôüí ôïí áñéèìü!";
            message.style.backgroundColor = "var(--msg-wrong-color)";
        }
    } else {
        message.textContent = "Äþóôå Ýíáí áñéèìü ìåôáîý 1 êáé 100.";
        message.style.backgroundColor = "var(--msg-wrong-color)";
    }
    
}

function restart(){
    restartButton.style.visibility = "hidden";
    lowHigh.textContent = "";
    message.textContent = "";
    newRandom();
    previousGuesses = [];
    triesCounter = 0;
    checkButton.style.visibility = "visible";
    newGuess.removeAttribute("readonly");
    newGuess.focus();
}
