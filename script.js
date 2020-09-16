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
        // Cycle through all cards.
//        let card = Math.floor(Math.random() * 20) + 1;
        let card2 = Math.floor(Math.random() * 52) + 1;
        // Display bottom card (higher up)
        let cardDOM = document.querySelector('.card');
        cardDOM.style.display = 'block';
        cardDOM.src = 'images/card-back.jpg';
            // Make value of Jack, Queen, and King = 10;
//            if (card === 11 || card === 12 | card === 13) {
//                card = 10; 
//            }
        // Display top card (lower down)
        let cardDOM2 = document.querySelector('.card2');
        cardDOM2.style.display = 'block';
        cardDOM2.src = 'images/card-' + card2 + '.svg';
            // Make value of Jacks, Queens, and Kings = 10;
            if (card2 === 11 || card2 === 12 || card2 === 13 || card2 === 24 || card2 === 25 || card2 === 26 || card2 === 37 || card2 === 38 || card2 === 39 || card2 === 50 || card2 === 51 || card2 === 52) {
                card2 = 10;
            } else if (card2 === 14 || card2 === 27 || card2 === 40) { // Ace of Diamonds/Spades/Heart
                card2 = 1;
            } 
            else if (card2 === 15 || card2 === 28 || card2 === 41) { // 2 of Diamonds/Spades/Heart
                card2 = 2;
            } 
            else if (card2 === 16 || card2 === 29 || card2 === 42) { // 3 of Diamonds/Spades/Heart
                card2 = 3;
            }  
            else if (card2 === 17 || card2 === 30 || card2 === 43) { // 4 of Diamonds/Spades/Heart
                card2 = 4;
            } 
            else if (card2 === 18 || card2 === 31 || card2 === 44) { // 5 of Diamonds/Spades/Heart
                card2 = 5;
            } 
            else if (card2 === 19 || card2 === 32 || card2 === 45) { // 6 of Diamonds/Spades/Heart
                card2 = 6;
            } 
            else if (card2 === 20 || card2 === 33 || card2 === 46) { // 7 of Diamonds/Spades/Heart
                card2 = 7;
            }
            else if (card2 === 21 || card2 === 34 || card2 === 47) { // 8 of Diamonds/Spades/Heart
                card2 = 8;
            } 
            else if (card2 === 22 || card2 === 35 || card2 === 48) { // 9 of Diamonds/Spades/Heart
                card2 = 9;
            } 
            else if (card2 === 23 || card2 === 36 || card2 === 49) { // 10 of Diamonds/Spades/Heart
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