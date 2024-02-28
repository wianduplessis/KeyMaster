
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
const resetInput = document.getElementById('reset');

// Initialize dynamic variables
const paragraphSize = 30;
let hasStarted = false;
let initialTime;
let counter = 0;

// Generate a random paragraph of words
function createParagraph(){
    
    let paragraph = "";

    for(let i=0; i < paragraphSize; i++){

        paragraph += words[Math.floor(Math.random()*words.length)];

        if(i !== paragraphSize - 1)
            paragraph += " ";
    }
    return paragraph;
}

// Display paragraph and reset 
async function renderParagraph(){

    const paragraph = createParagraph();
    paragraphSection.innerHTML = "";
    let spanCounter = 0;

    paragraph.split(" ").forEach(word => {

        const wordSpan = document.createElement('span');
        wordSpan.id = "span" + spanCounter;
        wordSpan.innerText= word + " ";
        paragraphSection.appendChild(wordSpan);
        counter++;
        spanCounter++;
    });;

    userInput.value = null;
    hasStarted = false;
    counter = 0;

    paragraphSection.querySelector('#span0').classList = "next";
}

// Check keypress from the user
userInput.addEventListener("keydown", e => {
  
    wordArray = paragraphSection.querySelectorAll('span');

    // Start timer
    if(e.key && !hasStarted ){
        startTimer();
        hasStarted = true;
    }

    if(e.key === ' ' || e.code == "Space"){

        e.preventDefault();
        
        // End and display wpm
        if(userInput.value === wordArray[paragraphSize-1].innerText && counter === paragraphSize - 1){
            counterSection.innerText ="WPM: " + Math.floor(paragraphSize/getTime()*60);
            renderParagraph();
        }

        userInput.value += e.key;

        // Display word as correct and continue
        if(userInput.value === wordArray[counter].innerHTML){
            userInput.value = null;
            paragraphSection.querySelector("#span" + counter).classList = "correct";
            counter++;
            paragraphSection.querySelector('#span' + counter).classList = "next";
        }

    }
})

// Get initial time when the test starts
function startTimer() {
    initialTime = new Date();
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