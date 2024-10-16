const cardElements = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById('reset-button');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

// Function to shuffle cards
function shuffle() {
  cardElements.forEach(card => {
    const randomPos = Math.floor(Math.random() * cardElements.length);
    card.style.order = randomPos;
  });
}

// Function to handle card flip
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  
  checkForMatch();
}

// Function to check for a match
function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// Function to disable cards if matched
function disableCards() {
  matchedCards += 2;
  if (matchedCards === cardElements.length) {
    resetButton.style.display = 'block'; // Show reset button
  }
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Function to unflip cards if not matched
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

// Function to reset the board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Function to reset the game
function resetGame() {
  matchedCards = 0;
  resetButton.style.display = 'none'; // Hide reset button
  cardElements.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
}

// Event listeners
cardElements.forEach(card => card.addEventListener('click', flipCard));
resetButton.addEventListener('click', resetGame);

// Initialize the game
shuffle();