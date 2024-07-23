import { useState, createContext, useContext } from 'react';
import './wuziqi.css';

const RowContext = createContext(null);
const ColContext = createContext(null);
const NumberContext = createContext(null);

export default function Game() {
  const row = 15;
  const col = 15;
  const number = 5;
  const [history, setHistory] = useState([Array(row * col).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <GameProvider row={row} col={col} number={number}>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </GameProvider>
  );
}

function GameProvider({ children, row, col, number }) {
  return (
    <RowContext.Provider value={row}>
      <ColContext.Provider value={col}>
        <NumberContext.Provider value={number}>
          {children}
        </NumberContext.Provider>
      </ColContext.Provider>
    </RowContext.Provider>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  const row = useContext(RowContext);
  const col = useContext(ColContext);
  const number = useContext(NumberContext);
  const winnerlines = getWinnerLines(squares, row, col, number);

  function handleClick(i) {
    if (calculateWinner(squares, winnerlines) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares, winnerlines);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const colArr = Array(col).fill(0).map((v, i) => i);
  const rowArr = Array(row).fill(0).map((v, i) => i);

  return (
    <>
      <div className="status">{status}</div>
      {colArr.map(c =>
        <div className="board-row" key={c}>
          {rowArr.map(r =>
            <Square key={c * row + r} value={squares[c * row + r]}
              onSquareClick={() => handleClick(c * row + r)} />
          )}
        </div>
      )}
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares, lines) {
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let flag = true;
    for (var j = 0; j < line.length; j++) {
      if (squares[line[j]]) {
        if (j > 0 && squares[line[j]] !== squares[line[j - 1]]) {
          flag = false;
          break;
        }
      }else {
        flag = false;
        break;
      }
    }
    if(flag) return squares[line[0]];
  }
  return null;
}

function getWinnerLines(squares, row, col, number) {
  const numberArr = Array(number).fill(0).map((v, i) => i);

  let lines = [];
  for (let i = 0; i < squares.length; i++) {
    let x = i % row;
    let y = (i - i % row) / row;

    if (x + number < row + 1) {
      lines.push(numberArr.map(n => i + n));
    }

    if (y + number < col + 1) {
      lines.push(numberArr.map(n => i + n * row));

      if (x + number < row + 1) lines.push(numberArr.map(n => i + n * row + n));

      if (x - number > -2) lines.push(numberArr.map(n => i + n * row - n));
    }
  }

  return lines;
}