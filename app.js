const words = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'
  ];
  
const paragraphSection = document.getElementById('paragraph');
let userInput = document.getElementById('textbox');

const paragraphSize = 50;
let counter = 0;
let initialTime;
let seconds;
let hasStarted = 0;

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
        paragraphSection.appendChild(wordSpan)

    });;

    counter = 0;
    userInput.value = null;
    hasStarted = 0;
}

userInput.addEventListener("keydown", e => {
  
    wordArray = paragraphSection.querySelectorAll('span');

    if(e.key && hasStarted === 0){
        startTimer();
        hasStarted++;
    }

    if(e.key === ' ' || e.code == "Space"){

        if(userInput.value === wordArray[paragraphSize-1].innerText && counter === paragraphSize -1){
            e.preventDefault();
            seconds = getTime();
            console.log(seconds);
            renderParagraph();
        }

        if(userInput.value + " " === wordArray[counter].innerText){
            e.preventDefault();
            userInput.value = null;
            paragraphSection.querySelector("#span" + counter).classList = "correct";
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

renderParagraph();