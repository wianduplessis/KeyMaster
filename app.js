const words = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'
  ];

  const paragraphSize = 10;

// Create a random paragraph of words by selecting random words from array
function createParagraph(){
    
    let paragraph = "";

    for(let i = 0; i < paragraphSize; i++ ){
        paragraph += words[Math.floor(Math.random()*words.length)];

        if(i !== paragraphSize - 1)
            paragraph += " ";
    }
    return paragraph;
}

const paragraphSection = document.getElementById('paragraph');
let userInput = document.getElementById('textbox');
let counter = 0;


async function renderParagraph(){

    let spanId = 0;

    const paragraph = await createParagraph();
    paragraphSection.innerHTML = "";

    paragraph.split(" ").forEach(word => {

        const wordSpan = document.createElement('span');
        wordSpan.id = "span" + spanId;
        spanId++;
        wordSpan.innerText= word + " ";
        paragraphSection.appendChild(wordSpan)

    });;

    counter = 0;
    userInput.value = null;
}


userInput.addEventListener("keydown", e => {
  
    wordArray = paragraphSection.querySelectorAll('span');

    if(e.key === ' ' || e.code == "Space"){

        if(userInput.value === wordArray[paragraphSize-1].innerText){
            e.preventDefault()
            console.log("DONE");
            renderParagraph();
        }

        if(userInput.value + " " === wordArray[counter].innerText){
            e.preventDefault();
            console.log("ree");
            userInput.value = null;
            paragraphSection.querySelector("#span" + counter).classList = "correct";
            counter++;

            
        }
    }
})



renderParagraph();