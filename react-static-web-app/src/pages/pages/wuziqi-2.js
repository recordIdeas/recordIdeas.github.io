import { useState, createContext, useContext } from 'react';
import './wuziqi.css';

const RowContext = createContext(null);
const ColContext = createContext(null);

export default function Game() {
  const row = 15;
  const col = 15;
  const number = 5;

  const initSquares = Array(row * col).fill(null);
  const [history, setHistory] = useState([{
    squares: initSquares,
    lines: getInitLines(initSquares, row, col, number)
  }]);

  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const currentLines = history[currentMove].lines;

  function handlePlay(nextSquares, nextLines) {
    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      lines: nextLines
    }];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((item, move) => {
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
    <GameProvider row={row} col={col}>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext}
            squares={currentSquares}
            lines={currentLines}
            onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </GameProvider>
  );
}

function GameProvider({ children, row, col }) {
  return (
    <RowContext.Provider value={row}>
      <ColContext.Provider value={col}>
        {children}
      </ColContext.Provider>
    </RowContext.Provider>
  )
}

function Board({ xIsNext, squares, lines, onPlay }) {
  const row = useContext(RowContext);
  const col = useContext(ColContext);
  const colArr = Array(col).fill(null);
  const rowArr = Array(row).fill(null);
  const [winner, nextLines] = calculateWinner(squares, lines);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    if(winner || squares[i]) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, nextLines);
  }

  return (
    <>
      <div className="status">{status}</div>
      {colArr.map((v, c) =>
        <div className="board-row" key={c}>
          {rowArr.map((v, r) =>
            <Square key={c * row + r} value={squares[c * row + r]} onSquareClick={() => handleClick(c * row + r)} />
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
  for(let s = 0; s < squares.length; s++) {
    if(squares[s] && lines[s]) {
      let removeLine = [];

      for (var i = 0; i < lines[s].length; i++) {
        let line = lines[s][i];
        let flag = true;

        for (var j = 1; j < line.length; j++) {
          if(squares[line[j]]) {
            if(squares[line[j]] !== squares[s]) {
              removeLine.push(i);
              flag = false;
              break;
            }
          }else {
            flag = false;
            break;
          }
        }

        if(flag) return [squares[line[0]], null];
      }

      if(removeLine.length === lines[s].length) {
        delete lines[s];
      }else {
        lines[s] = lines[s].filter((line, i)=>!removeLine.includes(i));
      }
    }
  }

  return [null, lines];
}

function getInitLines(squares, row, col, number) {
  const numberArr = Array(number).fill(0).map((v, i) => i);

  let lines = {};
  for (let i = 0; i < squares.length; i++) {
    let x = i % row;
    let y = (i - i % row) / row;
    let line = [];

    if (x + number < row + 1) {
      line.push(numberArr.map(n => i + n));
    }

    if (y + number < col + 1) {
      line.push(numberArr.map(n => i + n * row));

      if (x + number < row + 1) line.push(numberArr.map(n => i + n * row + n));

      if (x - number > -2) line.push(numberArr.map(n => i + n * row - n));
    }

    if(line.length > 0) lines[i] = line;
  }

  return lines;
}