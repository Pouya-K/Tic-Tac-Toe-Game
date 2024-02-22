import {useState} from "react";

function Square({value, handleClick}) {
  return(
      <button
          className="square"
          onClick={handleClick}
      >{value}</button>
  )
}
function Restart({handleClick}){
    return(
        <button
            onClick={handleClick}
        >{"Click to Restart Game!"}</button>
    )
}
export default function Board(){
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xMovesNext, setXMovesNext] = useState(true)
    const winner = calculateWinner(squares)
    function handleSquareClick(squareIndex){
        const copyOfSquares = squares.slice()
        if (squares[squareIndex] == null && !calculateWinner(squares)) {
            if (xMovesNext) {
                copyOfSquares[squareIndex] = "X"
            } else {
                copyOfSquares[squareIndex] = "O"
            }
            setXMovesNext(!xMovesNext)
            setSquares(copyOfSquares)
        }
    }

    function restartGame(){
        const squaresCopy = squares.slice()
        for (var i = 0; i<9; i++){
            squaresCopy[i] = null
        }
        setXMovesNext(true)
        setSquares(squaresCopy)
    }

    let message;
    if(winner){
        message = "Player: " + winner + " has won!";
    }
    else {
        message = "Next player: " + (xMovesNext ? "X" : "O");
    }
    return (
        <>
            <div className={"status"}>{message}</div>
            <div className="board-row">
                <Square value={squares[0]} handleClick={() => handleSquareClick(0)}/>
                <Square value={squares[1]} handleClick={() => handleSquareClick(1)}/>
                <Square value={squares[2]} handleClick={() => handleSquareClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} handleClick={() => handleSquareClick(3)}/>
                <Square value={squares[4]} handleClick={() => handleSquareClick(4)}/>
                <Square value={squares[5]} handleClick={() => handleSquareClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} handleClick={() => handleSquareClick(6)}/>
                <Square value={squares[7]} handleClick={() => handleSquareClick(7)}/>
                <Square value={squares[8]} handleClick={() => handleSquareClick(8)}/>
            </div>
            <div>
                <Restart handleClick={() => restartGame()}></Restart>
            </div>
        </>
    );
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}