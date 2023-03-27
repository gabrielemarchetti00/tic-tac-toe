const gameBoard = (() => {
    let board = ['','','','','','','','',''];
    const getBoard = () => board;

    const addMark = (cell, player) => {
        board[cell] = player.mark;
    };

    return {getBoard, addMark};
})();

const player = (name, mark) => {
    return {name, mark};
};

const gameController = (() => {
    const playerOne = player('', 'x');
    const playerTwo = player('', 'o');
    const win = document.querySelector('.win');

    const btn = document.querySelector('button');
    const b = document.querySelector('.board');
    let play = true;
    btn.addEventListener('click', () => {
        if(play){
            console.log(play);
            playerOne.name = prompt('Insert player one name: ');
            playerTwo.name = prompt('Insert player two name: ');
            displayController.updateScreen();
            b.style.display = 'block';
            btn.textContent = 'Restart';
            btn.style.backgroundColor = 'green'; 
            play = false;
        }
        else{
            console.log(play);
            let board = gameBoard.getBoard();
            for(i in board){
                board[i] = '';
            }
            displayController.updateScreen();
            win.textContent = '';
        }
    });

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const playRound = (cell) => {
        gameBoard.addMark(cell, getActivePlayer());
        switchPlayerTurn();
    };

    let winner;
    const checkWin = (board) => {
        if(
           (board[0] == 'x' && board[1] == 'x' && board[2] == 'x') ||
           (board[3] == 'x' && board[4] == 'x' && board[5] == 'x') ||
           (board[6] == 'x' && board[7] == 'x' && board[8] == 'x') ||
           (board[0] == 'x' && board[3] == 'x' && board[6] == 'x') ||
           (board[1] == 'x' && board[4] == 'x' && board[7] == 'x') ||
           (board[2] == 'x' && board[5] == 'x' && board[8] == 'x') ||
           (board[0] == 'x' && board[4] == 'x' && board[8] == 'x') ||
           (board[2] == 'x' && board[4] == 'x' && board[6] == 'x')
        ){
            winner = playerOne;
            win.textContent = `The winner is ${winner.name}!`;
        }
        else if(
            (board[0] == 'o' && board[1] == 'o' && board[2] == 'o') ||
            (board[3] == 'o' && board[4] == 'o' && board[5] == 'o') ||
            (board[6] == 'o' && board[7] == 'o' && board[8] == 'o') ||
            (board[0] == 'o' && board[3] == 'o' && board[6] == 'o') ||
            (board[1] == 'o' && board[4] == 'o' && board[7] == 'o') ||
            (board[2] == 'o' && board[5] == 'o' && board[8] == 'o') ||
            (board[0] == 'o' && board[4] == 'o' && board[8] == 'o') ||
            (board[2] == 'o' && board[4] == 'o' && board[6] == 'o')
        ){
            winner = playerTwo;
            win.textContent = `The winner is ${winner.name}!`;
        }
    }

    const checkTie = (board) => {
        let tie = true;
        for(i in board){
            if(board[i] == ''){
                tie = false;
            }
        }
        if(tie){
            win.textContent = 'It\' a Tie!';
        }
    }

    return {playRound, getActivePlayer, checkWin, checkTie};
})();


const displayController = (() => {
    const playerTurnDiv = document.querySelector('.turn');
    let tds = document.querySelectorAll('td');

    const updateScreen = () => {
        const activePlayer = gameController.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        let i = 0;
        tds.forEach((td) => {
            for(i in gameBoard.getBoard()){
                if(i == td.id){
                    td.textContent = gameBoard.getBoard()[i];
                }
            }
        });
    }

    function clickHandlerBoard(id){
        gameController.playRound(id);
        gameController.checkWin(gameBoard.getBoard());
        gameController.checkTie(gameBoard.getBoard());
        updateScreen();
    };
    tds.forEach((td) => {
        td.addEventListener('click', () => {
            if(td.textContent == ''){
                clickHandlerBoard(td.id);
            }
        });
    });

    return{updateScreen}
})();