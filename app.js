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
  
const paragraphSection = document.getElementById('paragraph');
let userInput = document.getElementById('textbox');
const counterSection = document.getElementById('counter');
let resetInput = document.getElementById('reset');

const paragraphSize = 30;
let hasStarted = false;
let initialTime;

let counter = 0;
let currentWord = 0;

function createParagraph(){
    
    let paragraph = "";

    for(let i = 0; i < paragraphSize; i++ ){
        paragraph += words[Math.floor(Math.random()*words.length)];

        if(i !== paragraphSize - 1)
            paragraph += " ";
    }
    return paragraph;
}

async function renderParagraph(){

    const paragraph = await createParagraph();
    paragraphSection.innerHTML = "";
    let spanId = 0;

    paragraph.split(" ").forEach(word => {

        const wordSpan = document.createElement('span');
        wordSpan.id = "span" + spanId;
        spanId++;
        wordSpan.innerText= word + " ";
        paragraphSection.appendChild(wordSpan);

    });;

    counter = 0;
    userInput.value = null;
    hasStarted = false;
    currentWord = 0;

    paragraphSection.querySelector('#span' + currentWord).classList = "next";
}

userInput.addEventListener("keydown", e => {
  
    wordArray = paragraphSection.querySelectorAll('span');

    if(e.key && !hasStarted ){
        startTimer();
        hasStarted = true;;
    }

    if(e.key === ' ' || e.code == "Space"){

        if(userInput.value === wordArray[paragraphSize-1].innerText && counter === paragraphSize - 1){
            e.preventDefault();
            counterSection.innerText ="WPM: " + Math.floor(paragraphSize/getTime()*60);
            renderParagraph();
        }

        if(userInput.value + " " === wordArray[counter].innerText || userInput.value + " " === wordArray[counter].innerHTML){
            e.preventDefault();
            userInput.value = null;

            paragraphSection.querySelector("#span" + counter).classList = "correct";
            currentWord++;
            paragraphSection.querySelector('#span' + currentWord).classList = "next";
            counter++;
        }
    }
})

function startTimer() {
    initialTime = new Date();
}

function getTime() {
    return Math.floor((new Date() - initialTime) / 1000);
}

resetInput.addEventListener('click', e => {
    renderParagraph();
});

renderParagraph();