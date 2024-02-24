const words = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'
  ];

const paragraphDisplayElement = document.getElementById('paragraph');
const inputElement = document.getElementById('textbox');

function createParagraph(){
    paragraphSize = 150;
    paragraph = "";

    for(let i = 0; i < paragraphSize; i++ ){
        paragraph += words[Math.floor(Math.random()*words.length)];

        if(i != paragraphSize-1){
            paragraph += " ";
        }
    }
    
    return paragraph;
}

async function getParagraph(){
    const paragraph = await createParagraph();
    paragraphDisplayElement.innerText = paragraph;
    inputElement.value = null;
}

getParagraph();
