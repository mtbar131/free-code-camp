const sessionUI = document.getElementById('sessionUI');
const breakUI = document.getElementById('breakUI');
const minusSession = document.getElementById('minusSession');
const plusSession = document.getElementById('plusSession');
const minusBreak = document.getElementById('minusBreak');
const plusBreak = document.getElementById('plusBreak');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const phaseUI = document.getElementById('phaseUI');
const timeRemainingUI = document.getElementById('timeRemainingUI');
const output = document.getElementById('output');
const minusPlusSound = new Audio('http://www.noiseforfun.com/waves/interface-and-media/NFF-select.wav');
const startResetSound = new Audio('http://www.noiseforfun.com/waves/interface-and-media/NFF-tiny-select.wav');
var sessionTime = 25;
var breakTime = 5;
var seconds = 0;
var resetTriggered = false;
var inBreak = false;

// Button events
minusSession.addEventListener('click', () => {
    minusPlusSound.play();
    
    if (sessionTime > 1) {
        sessionTime--;
        sessionUI.innerHTML = sessionTime;
    }
});

plusSession.addEventListener('click', () => {
    minusPlusSound.play();
    
    if (sessionTime < 90) {
        sessionTime++;
        sessionUI.innerHTML = sessionTime;
    }
});

minusBreak.addEventListener('click', () => {
    minusPlusSound.play();
    
    if (breakTime > 1) {
        breakTime--;
        breakUI.innerHTML = breakTime;
    }
});

plusBreak.addEventListener('click', () => {
    minusPlusSound.play();
    
    if (breakTime < 30) {
        breakTime++;
        breakUI.innerHTML = breakTime;
    }
});

startBtn.addEventListener('click', () => {
    startResetSound.play();
    output.style.opacity = 100;
    updateUI();
    updateTimer();
    startSession();
});

resetBtn.addEventListener('click', () => {
    startResetSound.play();
    output.style.opacity = 0;
    resetTriggered = true;
});


function updateUI() {
    minusSession.disabled = true;
    plusSession.disabled = true;
    minusBreak.disabled = true;
    plusBreak.disabled = true;
    startBtn.disabled = true;

    if (inBreak) {
        phaseUI.innerHTML = 'Break';
    }
    else {
        phaseUI.innerHTML = 'Session';
    }
}

function updateTimer() {
    // Update for break
    if (inBreak) {
        timeRemainingUI.innerHTML = breakTime + ':' + seconds;
        if (seconds < 10) {
            timeRemainingUI.innerHTML = breakTime + ':0' + seconds;
        }
    }
    // Update for session
    else {
        timeRemainingUI.innerHTML = sessionTime + ':' + seconds;
        if (seconds < 10) {
            timeRemainingUI.innerHTML = sessionTime + ':0' + seconds;
        }
    }

}

function startSession() {
    let myInterval = setInterval(() => {

        // Subtract minute, reset seconds
        if (sessionTime != 0 && seconds == 0) {
            sessionTime--;
            seconds = 59;
            updateTimer();
        }
        // Subtract second
        else {
            seconds--;
            updateTimer();
        }

        // Time over
        if (sessionTime == 0 && seconds == 0 || resetTriggered) {
            clearInterval(myInterval);
            startResetSound.play();
            startBreak();
        }

    }, 100);
}

function startBreak() {
    inBreak = true;
    phaseUI.innerHTML = 'Break';

    let myInterval = setInterval(() => {

        // Subtract minute, reset seconds
        if (breakTime != 0 && seconds == 0) {
            breakTime--;
            seconds = 59;
            updateTimer();
        }
        // Subtract second
        else {
            seconds--;
            updateTimer();
        }

        // Time over
        if (breakTime == 0 && seconds == 0 || resetTriggered) {
            clearInterval(myInterval);
            startResetSound.play();
            reset();
        }

    }, 100);
}

function reset() {

    sessionTime = 25;
    sessionUI.innerHTML = sessionTime;
    breakTime = 5;
    breakUI.innerHTML = breakTime;
    seconds = 0;

    phaseUI.innerHTML = '';
    timeRemainingUI.innerHTML = '';

    minusSession.disabled = false;
    plusSession.disabled = false;
    minusBreak.disabled = false;
    plusBreak.disabled = false;
    startBtn.disabled = false;

    resetTriggered = false;
    inBreak = false;
}
