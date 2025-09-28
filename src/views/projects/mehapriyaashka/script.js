const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Player object
let player = { x: 50, y: 150, size: 20, color: "cyan", xp: 0, level: 1 };

// Monster object
let monster = {
  x: 300, y: 150, size: 25, color: "red",
  hp: 50, maxHp: 50, alive: true
};

// Input keys
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Player movement
function movePlayer() {
  if (keys["ArrowUp"] || keys["w"]) player.y -= 2;
  if (keys["ArrowDown"] || keys["s"]) player.y += 2;
  if (keys["ArrowLeft"] || keys["a"]) player.x -= 2;
  if (keys["ArrowRight"] || keys["d"]) player.x += 2;

  // Boundaries
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

// Collision check
function checkCollision() {
  if (
    monster.alive &&
    player.x < monster.x + monster.size &&
    player.x + player.size > monster.x &&
    player.y < monster.y + monster.size &&
    player.y + player.size > monster.y
  ) {
    battle();
  }
}

// Battle system
function battle() {
  let choice = prompt("Battle! Type 'attack' or 'quiz'");
  if (!choice) return;

  if (choice.toLowerCase() === "quiz") {
    let q = prompt("What is 8 + 5?");
    if (q === "13") {
      alert("✅ Correct! Critical Hit!");
      monster.hp -= 50;
    } else {
      alert("❌ Wrong! You take damage (but we’ll ignore HP for now 😅).");
    }
  } else {
    alert("⚔️ You attack!");
    monster.hp -= 20;
  }

  if (monster.hp <= 0) {
    monster.alive = false;
    alert("💀 Monster defeated!");
    player.xp += 20;

    if (player.xp >= player.level * 50) {
      player.level++;
      alert("🔥 Level Up! You are now Level " + player.level);
    }

    document.getElementById("xp").innerText = player.xp;
    document.getElementById("lvl").innerText = player.level;
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Monster
  if (monster.alive) {
    ctx.fillStyle = monster.color;
    ctx.fillRect(monster.x, monster.y, monster.size, monster.size);

    // HP bar
    ctx.fillStyle = "lime";
    ctx.fillRect(
      monster.x,
      monster.y - 10,
      (monster.hp / monster.maxHp) * monster.size,
      5
    );
  }
}

// Game loop
function gameLoop() {
  movePlayer();
  checkCollision();
  draw();
  requestAnimationFrame(gameLoop);
}
gameLoop();
