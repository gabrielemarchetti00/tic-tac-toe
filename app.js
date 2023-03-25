const gameBoard = (() => {
    let gameboard = ['', 'x', 'o', 'x', 'o', '', '', 'x', ''];
    return {gameboard};
})();

const displayController = (() => {

})();

const player = () => {

};

function render(){
    let i = 0;
    let tds = document.querySelectorAll('td');
    tds.forEach((td) => {
        for(i in gameBoard.gameboard){
            if(i == td.id){
                td.textContent = gameBoard.gameboard[i];
            }
        }
    });
}

render();

