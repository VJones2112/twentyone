/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player draws a card as many times as desired. Each result get added to his ROUND score
- BUT, if the player's score >21, all her ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that her ROUND score gets added to her GLOBAL score. After that, it's the next player's turn
- The player closest to 21, but not over, on the GLOBAL score wins the game
*/

// Declare global variables
var scores, roundScore, activePlayer, gamePlaying;
let player1 = document.getElementById('name-0');
let player2 = document.getElementById('name-1');

// Call init function so it runs at start
init()

// Draw card and Get Score
/******************** * I think I could add the values of all 52 cards here... ***************/
document.querySelector('.btn-draw').addEventListener('click', function() {
    if(gamePlaying) {
        // Cycle through all cards. I'm only using clubs right now cuz I don't know how to do it otherwise
        let card = Math.floor(Math.random() * 13) + 1;
        let card2 = Math.floor(Math.random() * 13) + 1;
        // Display bottom card (higher up)
        let cardDOM = document.querySelector('.card');
        cardDOM.style.display = 'block';
        cardDOM.src = 'images/card-back.jpg';
            // Make value of Jack, Queen, and King = 10;
            if (card === 11 || card === 12 | card === 13) {
                card = 10;
            }
        // Display top card (lower down)
        let cardDOM2 = document.querySelector('.card2');
        cardDOM2.style.display = 'block';
        cardDOM2.src = 'images/card-' + card2 + '.svg';
            // Make value of Jack, Queen, and King = 10;
            if (card2 === 11 || card2 === 12 | card2 ===13) {
                card2 = 10;
            }
        // Get the score
        roundScore += card2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
}); // End of Draw Card




// Hold Dice, Add to Round Score, Determine if Winner
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add value of current card to player's global score
        scores[activePlayer] += roundScore;
        // Update UI to show the global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] === 21) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
            document.querySelector('.card').style.display = 'none';
            document.querySelector('.card2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else if (scores[activePlayer] > 21) {
            document.querySelector('#name-' + activePlayer).textContent = 'Too high! You lose!'; 
            document.querySelector('.card').style.display = 'none';
            document.querySelector('.card2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
            // if (scores[player2] === scores[player1]) {
            //     document.querySelectorAll('#name-').textContent = 'It\'s a tie!'; 
            //     document.querySelector('.card').style.display = 'none';
            //     document.querySelector('.card2').style.display = 'none';
            //     document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //     document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //     gamePlaying = false;
            // }
        }
    }
});



// Remove points, toggle active class
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // Do I need this for 21?
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.card').style.display = 'none';
    document.querySelector('.card2').style.display = 'none';
}

// New Game Button
document.querySelector('.btn-new').addEventListener('click', init)
// New Game Function
function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.card').style.display = 'none';
    document.querySelector('.card2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}