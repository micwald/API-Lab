// Game settings
simonGame = {
    round: 0,
    index: 0,
    steps: [],
    buttons: ['green', 'red', 'yellow', 'blue'],
    sound:{
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
}

// Console message
const $console = $('.console');

// Play color corresponding sound
$(this).on('click', function(e) {
    var color = e.target.id;
    simonGame.sound[color].currentTime = 0;
    simonGame.sound[color].play();
    if(color === simonGame.steps[simonGame.index]) {
        simonGame.index++;
        if(simonGame.index === simonGame.round) {
            simonGame.index = 0;
            $console.text('Great job!');
            generateStep();
            showSteps();
        }
    } else {
        if(simonGame.round === 0) {
            $console.text('Press the "Start game" button!');
        } else {
            $console.text('Game over! You reached round ' + simonGame.round);
            resetSimon();
        }
    }
});

// Random a number between 1 and 4 and return a color
function generateStep() {
   simonGame.steps.push(simonGame.buttons[Math.floor((Math.random() * 4))]);
   simonGame.round++;
}

// Play specific step
function playStep(step) {
    $('#' + step).addClass('hover');
    simonGame.sound[step].play();
    setTimeout(function(){
        $('#' + step).removeClass('hover');
    }, 300);
}

// Show all steps
function showSteps() {
    $('.inner-circle').text(simonGame.round);
    var num = 0;
    var moves = setInterval(function(){
        playStep(simonGame.steps[num]);
        $console.text('Wait...');
        num++;
        if (num >= simonGame.steps.length) {
            $console.text('Repeat the steps!');
            clearInterval(moves);
        }
    }, 600);
}

function resetSimon(){
    $('.inner-circle').text(simonGame.round);
    simonGame.round = 0;
    simonGame.index = 0;
    simonGame.steps = [];
}

$('button').on('click', function(){
    resetSimon()
    generateStep();
    showSteps();
});
