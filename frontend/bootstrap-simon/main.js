const target1 = document.getElementById('target1');
const target2 = document.getElementById('target2');
const target3 = document.getElementById('target3');
const target4 = document.getElementById('target4');
const round = document.getElementById('round');
const turn = document.getElementById('turn');
const strict = document.getElementById('strict');
var strictMode = false;

// Game obj
var game = {
  round: 0,
  targets: [target1,target2,target3,target4],
  currentSeq: [],
  playerInput: [],
  sound:{
    target1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    target2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    target3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    target4: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
};

// Event listeners
target1.addEventListener('click', () => {
    game.sound.target1.play();
    game.playerInput.push(1);
    lengthCheck();
});
target2.addEventListener('click', () => {
    game.sound.target2.play();
    game.playerInput.push(2);
    lengthCheck();
});
target3.addEventListener('click', () => {
    game.sound.target3.play();
    game.playerInput.push(3);
    lengthCheck();
});
target4.addEventListener('click', () => {
    game.sound.target4.play();
    game.playerInput.push(4);
    lengthCheck();
});
strict.addEventListener('click', () => {
    strictMode = !strictMode;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(playGame, 1500);
});

// Functions
function playGame() {
    
    game.round++;
    round.innerHTML = game.round;
    generateMove();
    showSeq();
}
function generateMove() {
    var move = Math.floor(Math.random() * 4 + 1);
    game.currentSeq.push(move);
}
function showSeq() {
    
    turn.innerHTML = 'Computer';
    disableButtons();
    
    var i = 0;
    var myInterval = setInterval(function(){
        flash(game.currentSeq[i]);
        i++;
        if (i > game.currentSeq.length) {
            clearInterval(myInterval);
            playerTurn();
        }
  }, 600);
  
}
function playerTurn() {
    game.playerInput = [];
    turn.innerHTML = 'Player';
    enableButtons();
}
function lengthCheck() {
    
    if (game.playerInput.length == game.currentSeq.length) {
        inputCheck();
    }
}
function inputCheck() {
    var matches = true;
    
    for(var i = game.currentSeq.length; i--;) {
        if(game.currentSeq[i] !== game.playerInput[i])
            matches = false;
    }
    
    if (matches) {
        
        // Game won
        if (game.round == 20) {
            alert('You beat the game!');
        }
        
        alert('Correct! Moving on to next round');
        playGame();
    }
    else {
        if (strictMode) {
            alert('Incorrect! Game over');
            resetGame();
        }
        else {
            alert('Incorrect! Try again');
            showSeq();
        }
    }
    
    
}
function flash(target) {
    switch(target) {
    case 1:
        target1.classList.remove('btn-success');
        setTimeout(function(){
            target1.classList.add('btn-success');
        }, 200);
        break;
    case 2:
        target2.classList.remove('btn-danger');
        setTimeout(function(){
            target2.classList.add('btn-danger');
        }, 200);
        break;
    case 3:
        target3.classList.remove('btn-warning');
        setTimeout(function(){
            target3.classList.add('btn-warning');
        }, 200);
        break;
    case 4:
        target4.classList.remove('btn-primary');
        setTimeout(function(){
            target4.classList.add('btn-primary');
        }, 200);
        break;
    }
}
function resetGame() {
    game.round = 0;
    game.currentSeq = [];
    game.playerInput = [];
    game.strict = false;
    playGame();
}
function disableButtons() {
    target1.disabled = true;
    target2.disabled = true;
    target3.disabled = true;
    target4.disabled = true;
}
function enableButtons() {
    target1.disabled = false;
    target2.disabled = false;
    target3.disabled = false;
    target4.disabled = false;
}