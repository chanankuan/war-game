const cardsContainer = document.getElementById('cards');
const newDeckBtn = document.getElementById('new-deck');
const drawCardBtn = document.getElementById('draw-cards');
const displayWinner = document.querySelector('.show-winner');
const remainingCards = document.querySelector('.remaining-cards');
const computerScoreText = document.querySelector('.computer-score');
const playerScoreText = document.querySelector('.player-score');
let deckId,
  computerScore = 0,
  playerScore = 0;

const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'QUEEN',
  'KING',
  'ACE',
];

newDeckBtn.addEventListener('click', gameInit);

drawCardBtn.addEventListener('click', () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
      `;
      cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
      `;

      displayWinner.textContent = determineCardWinner(data);
      remainingCards.textContent = `Remaining Cards: ${data.remaining}`;

      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
        const winner = determineWinner(computerScore, playerScore);
        displayWinner.textContent = winner;

        resetGame();
      }
    });
});

function gameInit() {
  resetGame();

  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
      remainingCards.textContent = `Remaining Cards: ${data.remaining}`;
      drawCardBtn.disabled = false;

      computerScoreText.textContent = 'Computer score: 0';
      playerScoreText.textContent = 'My score: 0';
    });
}

function determineCardWinner(obj) {
  const value1 = values.indexOf(obj.cards[0].value);
  const value2 = values.indexOf(obj.cards[1].value);

  if (value1 > value2) {
    computerScoreText.textContent = `Computer score: ${++computerScore}`;
    return 'Computer wins!';
  } else if (value1 < value2) {
    playerScoreText.textContent = `My score: ${++playerScore}`;
    return 'You win!';
  } else {
    return 'Game of War!';
  }
}

function determineWinner(x, y) {
  return x > y
    ? 'LOX. Computer wins!'
    : x < y
    ? 'Congratulations! You win!'
    : 'Draw!';
}

function resetGame() {
  computerScore = 0;
  playerScore = 0;
}
