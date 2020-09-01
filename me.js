const main = document.querySelector('.wrapper');
const roll = main.querySelector('.btn-roll');
const newbtn = main.querySelector('.btn-new');
const hold = main.querySelector('.btn-hold');

let dice1, dice2, activePlayer, score, roundScore, gamePlaying;

start();

function noDice() {
  main.querySelector('#dice-1').style.display = 'none';
  main.querySelector('#dice-2').style.display = 'none';
}

function start() {
  activePlayer = 0;
  score = [0, 0];
  roundScore = 0;
  noDice();
  gamePlaying = true;
  main.querySelector('#current-0').textContent = 0;
  main.querySelector('#current-1').textContent = 0;
  main.querySelector('#score-0').textContent = 0;
  main.querySelector('#score-1').textContent = 0;
  main.querySelector('.player-0-panel').classList.remove('winner');
  main.querySelector('.player-1-panel').classList.remove('winner');
  main.querySelector('.player-0-panel').classList.remove('active');
  main.querySelector('.player-1-panel').classList.remove('active');
  main.querySelector('.player-0-panel').classList.add('active');
  main.querySelector('.final-score').value = null;
}

function newPlayer() {
  roundScore = 0;
  main.querySelector('#current-' + activePlayer).textContent = roundScore;
  main.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  main.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
}


roll.addEventListener('click', () => {
  if (gamePlaying) {
    dice1 = Math.floor(Math.random() * 6) + 1;
    console.log(dice1);
    dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice2);

    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
    main.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
    main.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      main.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      newPlayer();
    }
  }

});

hold.addEventListener('click', () => {
  if (gamePlaying) {
    let input = main.querySelector('.final-score').value
    let finalScore;
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }

    score[activePlayer] += roundScore;
    main.querySelector('#score-' + activePlayer).textContent =
      score[activePlayer];
    if (score[activePlayer] >= finalScore) {
      main.querySelector('#name-' + activePlayer).textContent = "Winner!"
      main.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      main.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      noDice();
      gamePlaying = false;
    } else {
      newPlayer()
    }
  }

});

newbtn.addEventListener('click', start);
