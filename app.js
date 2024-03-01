const words = [
    "the", "more", "sentence", "between", "of", "day", "set", "city", "to", "could", 
    "three", "tree", "and", "go", "want", "cross", "a", "come", "air", "since", "in", 
    "did", "well", "is", "my", "also", "start", "it", "sound", "play", "might", "you", 
    "no", "small", "story", "that", "most", "end", "saw", "he", "who", "was", "know", 
    "water", "than", "call", "first", "people", "may", "land", "here", "must", "real", 
    "I", "part", "ask", "take", "work", "why", "together", "hot", "get", "change", "men", 
    "white", "but", "place", "made", "light", "kind", "off", "need", "house", "picture", 
    "try", "us", "again", "those", "what", "live", "point", "mother", "build", "self", 
    "earth", "father", "feet", "which", "through", "own", "page", "should", "took", 
    "way", "great", "answer", "school", "grow", "began", "study", "idea", "turn", 
    "before", "learn", "mountain", "north", "once", "fish", "hear", "still", "food", 
    "base", "thought", "cut", "sure", "see", "boy", "eye", "color", "face", "tell", 
    "door", "main"
  ];

// Get elements from index.html
const paragraphSection = document.getElementById('paragraph');
const userInput = document.getElementById('textbox');
const counterSection = document.getElementById('counter');
const resetInput = document.getElementById('resetButton');

// Initialize dynamic variables
let hasStarted = false;
let hasFinished = false;
let initialTime;
let counter;
let incorrectWords = 0;
let wordArray;
let paragraphSize;

// API does not work on github pages web hosting
// Generate random paragraphs for demonstration

// const QuoteAPI = 'http://api.quotable.io/random';

// function getQuote(){
//     return fetch(QuoteAPI)
//     .then(response => response.json())
//     .then(data => data.content)
// }


function createParagraph(){
    
    let paragraph = "";

    paragraphSize = Math.floor(Math.random()* (25 - 10 + 1)) + 10;

    for(let i = 0; i < paragraphSize; i++ ){
        paragraph += words[Math.floor(Math.random()*words.length)];

        if(i !== paragraphSize - 1)
            paragraph += " ";
    }
    console.log(paragraph)
    return paragraph;
}

// Display paragraph and reset 
async function renderParagraph(){

    let paragraph = await createParagraph();
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
    counterSection.innerText = "WPM: -- / ACC: --";
}

// Check keypress from the user and handle words accordingly
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

// Reset variables when creating a new paragraph
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
        paragraphSection.querySelector('#span' + counter).classList= "next";
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