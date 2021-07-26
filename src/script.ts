import * as PIXI from 'pixi.js';

let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
var appView;

/**
 * Get Randomly a choice of computer
 */
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

/**
 * If Player wins
 * @param {userInput} user 
 * @param {ComputerChoice} computer 
 */
function win(user, computer) {
  userScore++;
  userScore_span.innerHTML = String(userScore);
  result_div.innerHTML = resultText("#00FF00", "You Won");
  const userSelection = document.getElementById(user);
  userSelection.classList.add('winningStyles');
  
  setTimeout(() => userSelection.classList.remove('winningStyles'), 300);
}

function resultText(color, text): string {
  const skewText = new PIXI.Text(text);
  return skewText.text;
}

/**
 * If Player looses
 * @param {userInput} user 
 * @param {ComputerChoice} computer 
 */
function loses(user, computer) {
  computerScore++;
  computerScore_span.innerHTML = String(computerScore);
  result_div.innerHTML = resultText("#FF0000", "You Lost");
  const userSelection = document.getElementById(user);
  userSelection.classList.add('losingStyles');
  
  setTimeout(() => userSelection.classList.remove('losingStyles'), 300);
}



/**
 * If game is a draw
 * @param {userInput} user 
 * @param {computerChoice} computer 
 */
function draw(user, computer) {
  result_div.innerHTML = resultText("#FFFFFF", "It's a draw");
  const userSelection = document.getElementById(user);
  userSelection.classList.add('drawStyles');
  setTimeout(() => userSelection.classList.remove('drawStyles'), 300);
}

/**
 * Game logic to check who wins or if game is drawn
 * @param {userInput} userChoice 
 */
function game(userChoice) {
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice) {
    case 'paperrock':
    case 'rockscissors':
    case 'scissorspaper':
      win(userChoice, computerChoice);
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      loses(userChoice, computerChoice);
      break;
    case 'rockrock':
    case 'scissorsscissors':
    case 'paperpaper':
      draw(userChoice, computerChoice);
      break;
  }
}

/**
 * EntryPoint for the game logic
 */
function main() {
  appView = new PIXI.Application({
    width: 800,
    height: 600,
    resizeTo: window
  });
  appView.renderer.screen.x = (window.innerWidth - appView.renderer.width) / 2;
  appView.screen.y = (window.innerHeight - appView.renderer.height) / 2;

  document.body.appendChild(appView.view);
  rock_div.addEventListener('click', () => game('rock'));
  paper_div.addEventListener('click', () => game('paper'));
  scissors_div.addEventListener('click', () => game('scissors'));
}

main();
