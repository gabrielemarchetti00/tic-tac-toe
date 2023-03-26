const gameBoard = (() => {
    let board = [];
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
    const playerOne = player('Player one', 'x');
    const playerTwo = player('Player two', 'o')

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const playRound = (cell) => {
        gameBoard.addMark(cell, getActivePlayer());
        switchPlayerTurn();
    };

    return {playRound, getActivePlayer};
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
        td.addEventListener('click', () => {
            if(td.textContent == ''){
                clickHandlerBoard(td.id);
            }
        });
    });

    updateScreen();
})();