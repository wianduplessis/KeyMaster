// Random quote API
const QuoteAPI = 'http://api.quotable.io/random';

  
// Get elements from index.html
const paragraphSection = document.getElementById('paragraph');
const userInput = document.getElementById('textbox');
const counterSection = document.getElementById('counter');
const resetInput = document.getElementById('reset');

// Initialize dynamic variables
let paragraphSize;
let hasStarted = false;
let hasFinished = false;
let initialTime;
let counter;
let incorrectWords = 0;
let wordArray;

function getQuote(){
    return fetch(QuoteAPI)
    .then(response => response.json())
    .then(data => data.content)
}

// Display paragraph and reset 
async function renderParagraph(){

    let paragraph = await getQuote();
    paragraphSection.innerHTML = "";

    paragraph.split(" ").forEach((word,index) => {
        const wordSpan = document.createElement('span');
        wordSpan.id = "span" + index;
        wordSpan.innerText= word + " ";
        paragraphSection.appendChild(wordSpan);
    });

    resetVariables();

    

    paragraphSection.querySelector('#span0').classList = "next";
    wordArray = paragraphSection.querySelectorAll('span');
    paragraphSize= wordArray.length;
    console.log(paragraphSize);
    counterSection.innerText = "WPM: -- / ACC: --";
}

// Check keypress from the user
userInput.addEventListener("keydown", e => {

    if(e.key && !hasStarted ){
        startTimer();
    }

    if(e.key === ' ' || e.code == "Space"){

        e.preventDefault();
        if(counter === paragraphSize-1 && !hasFinished){
            handleLastWord();
            updateStats();
        }
        else if(userInput.value !== ""){
            handleRegularWord();
        }
        clearInput();
    }
});

function resetVariables(){
    userInput.value = null;
    hasStarted = false;
    counter = 0;
    incorrectWords = 0;
    hasFinished = false;
}

// Handle final word
function handleLastWord() {
    const lastWordSpan = wordArray[paragraphSize - 1];
    const userInputValue = userInput.value.trim();

     if(userInputValue !== lastWordSpan.innerText){
        paragraphSection.querySelector("#span" + counter).classList = "incorrect";
        incorrectWords++;
     }
     else{
        paragraphSection.querySelector("#span" + counter).classList = "correct";
     }

     hasFinished = true;
}

// Handle words (Change colours accordingly)
function handleRegularWord(){
    // Display word as correct and continue
    if(userInput.value === wordArray[counter].innerHTML.trim()){          
        paragraphSection.querySelector("#span" + counter).classList = "correct";
        counter++;
        paragraphSection.querySelector('#span' + counter).classList = "next";
    }
    
    // Display word as incorrect and continue
    else{        
        paragraphSection.querySelector("#span" + counter).classList = "incorrect";
        counter++;
        paragraphSection.querySelector('#span' + counter).classList = "next";
        incorrectWords++;
    }
}

// Clear inputbox
function clearInput(){
    userInput.value = null;
}

// Update WPM and ACC
function updateStats(){
    counterSection.innerText ="WPM: " + Math.floor(paragraphSize/getTime()*60);
    counterSection.innerText += " / ACC: " + Math.floor(((paragraphSize-incorrectWords)/paragraphSize)*100);
}

// Get initial time when the test starts
function startTimer() {
    initialTime = new Date();
    hasStarted = true;
}

// Get time
function getTime() {
    return Math.floor((new Date() - initialTime) / 1000);
}

// Reset
resetInput.addEventListener('click', e => {
    renderParagraph();
});

// Render initial paragraph
renderParagraph();