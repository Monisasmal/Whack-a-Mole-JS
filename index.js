const hole = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const timeLeft = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

let score = 0;
let currentTime = 30;
let gameTimer;
let moleTimer;
let lastHole = null;

function randomHole(){
  const idx = Math.floor(Math.random() * hole.length);
  const selectedHole = hole[idx];
  if(selectedHole === lastHole){
    return randomHole();
  }
  lastHole = selectedHole;
  return selectedHole;
}

function showMole(){
  const hole = randomHole();
  const mole = document.createElement('div');
  mole.classList.add('mole');

  mole.addEventListener('click',()=>{
    score++;
    scoreBoard.textContent = score;
    mole.remove();
  });
  hole.appendChild(mole);
  setTimeout(()=>{
    if(hole.contains(mole)){
      mole.style.animation = 'popDown 0.5s forwards';
      setTimeout(()=>mole.remove(),500);
    }
  },800);
}

function startGame(){
  score = 0;
  currentTime = 30;
  scoreBoard.textContent = score;
  timeLeft.textContent = currentTime;
  startBtn.disabled  = true;

  gameTimer = setInterval(() => {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime <= 0){
      clearInterval(gameTimer);
      clearInterval(moleTimer);
      alert(`Game Over! Your score: ${score}`);
      startBtn.disabled = false;
    }
  }, 1000);
  moleTimer = setInterval(showMole,800);
}

startBtn.addEventListener('click', startGame);

