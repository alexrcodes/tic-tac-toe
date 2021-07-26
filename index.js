window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '']; // act for the board
    let currentPlayer = 'X'; // store current player x or o
    let isGameActive = true; // whether we have an end game result or the game is still active


    const PLAYERX_WON = 'PLAYERX_WON'; // each 3 constant string values represent an endgame state
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {        // we will check if we have a winner or not by looping through our win conditions array.
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]]; // for every sub array which all contains 3 numbers we will check if the array has the same characters for these indexes.
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }   // if any of the three elements is an empty string we will skip that iteration using the 'continue' keyword.
            if (a === b && b === c) {
                roundWon = true;
                break;
            }   // if they are equal we set the round won variable to true and exit our for loop using the 'break' keyword.
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON); // if we have a winner we will use our announce function and call it with 'player x won' or 'player o won' based on the current players value.
            isGameActive = false;   // we will set the isGameActive to false.
            return;
        }  // based on the current players value

    if (!board.includes(''))
        announce(TIE);  // if we don't have a winner and our board doesn't have any empty strings left then we won't have any winners, so we announce a tie.
    }

    const announce = (type) => {     // it receives an endgame state string called type and based on that we will modify the announcers in the html.
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');  // we will remove the 'hide' class to show the announcer to the user.
    }; // this function is called to help announce our winner or endgame state to the user.

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    }; // checks whether the tile has a value already and if it has it returns false otherwise it returns true.
     // we use this function to make sure that players only play empty tiles in their turns.

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }  // this function sets the value of the element in the board array at the given position to be equal to the value of the currentPlayer variable.

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);   // first: we will remove the class list of the current player.
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';          // second: we will change our current player to be x if it was o or o if it was x.
        playerDisplay.innerText = currentPlayer;                    // third: we update the player display to display the current player with the appropriate class.
        playerDisplay.classList.add(`player${currentPlayer}`);
    }



    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {         // first: check if the step is a valid action and check if our game is active or not(whether it has an endgame state).
            tile.innerText = currentPlayer;               // second: if both conditions in step 1 are true, we set the inner text to the current player(X or O).
            tile.classList.add(`player${currentPlayer}`); // third: we will assign the player x or player o class based on the current player.
            updateBoard(index);                           // fourth: we will call the update board and update our board array.
            handleResultValidation();                     // fifth: we will check whether we have a winner or not.
            changePlayer();                               // sixth: we will call the change player method.
        }
    }   // this function represents a turn in the game, this function will be called when a user clicks on a tile
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];  // first: we set the board to contain 9 empty strings
        isGameActive = true;                           // second: we will set the isGameActive variable to true
        announcer.classList.add('hide');               // third: hide the announcer by adding the hide class

        if (currentPlayer === 'O') {
            changePlayer();
        }   // if the current player function is o then we call the change player function. 

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        }); // for every tile we will set the inner.Text to be an empty string and remove any player related classes.
    } // this function is used to reset the game state and the board


    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });  // whenever we click on the tile a user action function will be called with the reference to that specific tile and the index of it

    resetButton.addEventListener('click', resetBoard);
}); /* 
Added an event listen to the window object to listen for the dom content loaded event, 
this is needed because I included the JavaScript file in the head of the html and because of it's position this 
script will be processed before any html on the page. 
*/
