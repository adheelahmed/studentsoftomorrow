const colors = ["red", "green", "blue", "yellow"];
const numbers = Array.from({ length: 10 }, (_, i) => i);

let deck = [];
let playerHand = [];
let opponentHand = [];
let discardPile = [];
let gameOver = false; // NEW

function setStatus(message) {
  document.getElementById("status").innerText = message;
}

function createDeck() {
  deck = [];
  colors.forEach(color => {
    numbers.forEach(num => {
      deck.push({ color, num });
    });
  });
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  createDeck();
  playerHand = deck.splice(0, 7);
  opponentHand = deck.splice(0, 7);
  discardPile.push(deck.pop());

  setStatus("Game in progress...");
  gameOver = false;

  render();
}

function render() {
  const playerDiv = document.getElementById("player");
  const opponentDiv = document.getElementById("opponent");
  const discardDiv = document.getElementById("discard");

  playerDiv.innerHTML = "Your Hand: ";
  playerHand.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = `card ${card.color}`;
    el.innerText = card.num;
    el.onclick = () => playCard(i);
    playerDiv.appendChild(el);
  });

  opponentDiv.innerHTML = `Opponent (${opponentHand.length} cards)`;

  const topCard = discardPile[discardPile.length - 1];
  discardDiv.innerHTML = `<div class="card ${topCard.color}">${topCard.num}</div>`;
}

function playCard(index) {
  if (gameOver) return;

  const card = playerHand[index];
  const topCard = discardPile[discardPile.length - 1];

  if (card.color === topCard.color || card.num === topCard.num) {
    discardPile.push(playerHand.splice(index, 1)[0]);
    render();

    if (playerHand.length === 0) {
      setStatus("🎉 You win!");
      gameOver = true;
      return;
    } else {
      opponentTurn();
    }
  } else {
    setStatus("⚠️ Invalid move! Must match color or number.");
  }
}

function opponentTurn() {
  if (gameOver) return;

  const topCard = discardPile[discardPile.length - 1];
  const matchIndex = opponentHand.findIndex(
    c => c.color === topCard.color || c.num === topCard.num
  );

  if (matchIndex !== -1) {
    discardPile.push(opponentHand.splice(matchIndex, 1)[0]);
  } else {
    opponentHand.push(deck.pop());
  }

  render();

  if (opponentHand.length === 0) {
    setStatus("😢 Opponent wins!");
    gameOver = true;
    return;
  }
}

startGame();
