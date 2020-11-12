// GLOBALA VARIABLER
let wordList;   
let selectedWord;
let hiddenWord;
let answerArray;
let randomWordArray;
let liArray;
let key;
let guesses;     
let imgHangman; 
let liElements; 
let indexNum; 
let msgHolderEl;   
let guessWord;
let guessArray;
let isRunning;
let buttonArr;
let startGameBtnElb;
let deactivateStartBtn;

function init() {
    wordList = ['javascript', 'angular', 'html', 'python', 'java', 'angular', 'php'];   
    hiddenWord = [];
    selectedWord = "";
    answerArray = [];
    randomWordArray = [];
    liArray = [];
    guessArray = []; 
    guessWord = [];
    guesses = 0;    
    imgHangman = document.querySelector('#hangman');
    msgHolderEl = document.querySelector('#message');    
    liElements = document.querySelector('#letterBoxes').querySelectorAll('li');  
    buttonArr = document.querySelectorAll('#letterButtons > li > button');
    buttonArr.forEach(button => button.addEventListener('click', userClickButton));
    deactivateStartBtn = document.querySelector('#startGameBtn');
}
// FUNKTIONERNA FÖR SPELET

// Funktion som startar spelet vid knapptryckning, och då tillkallar andra funktioner
function startGame() {
    init();
    if(!isRunning) {
        generateRandomWord(); 
    }
    randomInputElement();  
}

startGameBtnElb = document.querySelector('#startGameBtn').addEventListener('click', startGame);

// Funktion som slumpar fram ett ord
function generateRandomWord() {
    selectedWord = Math.floor(Math.random() * wordList.length);
    hiddenWord = wordList[selectedWord].toUpperCase();
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord som slumptas fram
function randomInputElement() {
    for(let i = 0; i < hiddenWord.length; i++) {
        randomWordArray[i] = hiddenWord[i];
       
        liArray[i] = document.createElement('li');
        liArray[i].appendChild(document.createElement('input'));
        document.querySelector('#letterBoxes > ul').appendChild(liArray[i]);
    }     
}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function userClickButton(event) {
    key = event.target.value; 
    indexNum = hiddenWord.indexOf(key); 

    deactivateSingleBtn(); 
    
    if(indexNum != -1) {
        for(let i = 0; i < hiddenWord.length; i++){
            if(key == hiddenWord[i]) {
                liArray[i].querySelector('input').value = key; // lägger bokstäverna inuti input-rutorna
            }
        }
        randomWordArray.join('') // tar random ordet och slår ihop det till en sträng
        liElements = document.querySelector('#letterBoxes').querySelectorAll('li') 

        let guessArray = []; 

        liElements.forEach(li => { // liElements är en nodelist som vi loopar igenom och stoppar in i guessArray 
            guessArray.push(li.querySelector('input').value); // .push du lägger till varje loops element i liElement i guessArray
        });

        guessWord = guessArray.join(''); // gör om guessArray till en sträng 

        if (guessWord === hiddenWord) { // jämför strängen guessWord med hiddenWord
            msgHolderEl.textContent = "GRATTIS, du vann!";
            deactivateStartBtn.disabled = true;
            deactivateAllBtn();
        }
             
    } else if (guesses < 6) { 
        guesses++ 
        imgHangman.setAttribute('src', `/images/h${guesses}.png`);
        if(guesses === 6) {
            msgHolderEl.textContent = "Ledsen, du förlorade!"; 
            deactivateStartBtn.disabled = true;
            isRunning = false;
            deactivateAllBtn();
        }
    } 
}  
    
// Funktion som inaktiverar specifika knapparna vi knapptryck 
function deactivateSingleBtn() {
    for (let i = 0; i < buttonArr.length; i++) {
        if(buttonArr[i].outerText === key) { 
            buttonArr[i].disabled = true;  
        }     
    } 
}

// Funktion som deactivate alla knapparna
function deactivateAllBtn() {
    for (let i = 0; i < buttonArr.length; i++) {
        buttonArr[i].disabled = true
    }
}

// Funktion som aktiverar alla knapparna
function activateAllBtn() {
    for (let i = 0; i < buttonArr.length; i++) {
        buttonArr[i].disabled = false;
    }
}

document.querySelector('#restartGameBtn').addEventListener('click', restartGame);
// Knapp som startar om spelet
function restartGame() {
    isRunning = false;
    activateAllBtn(); 
    imgHangman.setAttribute('src', "images/h0.png"); 
    msgHolderEl.textContent = ""; // tar bort texten i slutet av spelet
    document.querySelector('#letterBoxes ul').innerHTML = ''; // tar bort all html under id=letterBoxes
    startGame();
}



