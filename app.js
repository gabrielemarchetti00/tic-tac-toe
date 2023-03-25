const gameBoard = (() => {
    let board = ['', 'x', 'o', 'x', 'o', '', '', 'x', ''];
    const getBoard = () => board;

    const placeSymbol = (cell, player) => {
        board[cell] = player.symbol;
    };

    return {getBoard, placeSymbol};
})();

const player = (name, symbol) => {
    return {name, symbol};
};

const gameController = (() => {
    const board = gameBoard.getBoard();
    const playerOne = player('Player one', 'x');
    const playerTwo = player('Player two', 'o')

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const playRound = (cell) => {
        gameBoard.placeSymbol(cell, getActivePlayer());
    };

    switchPlayerTurn();

    return {playRound, getActivePlayer, getBoard: board.getBoard};
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
        updateScreen();
    };
    tds.forEach((td) => {
        td.addEventListener('click', clickHandlerBoard(td.id));
    });

    updateScreen();
})();