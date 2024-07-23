import { useState } from 'react';
import './wuziqi.css';

const row = 15;
const col = 15;
const number = 5;
const [count, wins, lines] = getWinsLines(row, col, number);

export default function Game() {
  const [isAscending, setIsAscending] = useState(true);
  const [history, setHistory] = useState([
    {
      squares: Array(row).fill(null).map(item => Array(col).fill(null)),
    }
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [nextPlay, setNextPlay] = useState('X');

  const currentSquares = history[currentMove].squares;
  const currentPosition = history[currentMove].position;
  const winner = history[currentMove].winner;
  const line = history[currentMove].line;
  const myWin = history[currentMove].myWin;
  const AIWin = history[currentMove].AIWin;

  if (nextPlay === 'O') {
    setTimeout(() => {
      const calculateResult = calculateWinner(currentSquares, currentPosition, myWin, AIWin);

      setHistory(history.map((item, k) => {
        if (k === history.length - 1) {
          return calculateResult;
        } else {
          return item;
        }
      }));
      setNextPlay('X');
    });
  }

  function handlePlay(squares, nextPosition) {
    if (nextPlay === 'O') return;

    const nextSquares = squares.map(row => [...row]);
    const [r, c] = nextPosition;
    nextSquares[r][c] = 'X';

    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      position: nextPosition,
      myWin: myWin,
      AIWin: AIWin
    }];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setNextPlay('O');
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.length === 1 ? null : history.map((item, move) => {
    let description;

    if (move === currentMove) {
      if (move === 0) {
        description = 'You are at game start';
      } else {
        const [pos_r, pos_c] = item.position;
        description = 'You are at move (' + pos_r + ', ' + pos_c + ')';
      }

      return (
        <li key={move}><small>{description}</small></li>
      );

    } else {
      if (move === 0) {
        description = 'Go to game start';
      } else {
        const [pos_r, pos_c] = item.position;
        description = 'Go to move (' + pos_r + ', ' + pos_c + ')';
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board nextPlay={nextPlay}
          winner={winner}
          line={line}
          squares={currentSquares}
          onPlay={handlePlay} />
      </div>

      <div className="game-info">
        {moves && <label>
          <input type="checkbox" checked={isAscending} onChange={(e) => { setIsAscending(e.target.checked); }} />{isAscending ? 'Asc' : 'Desc'}
        </label>}
        {moves && isAscending && <ol key="moves">{moves}</ol>}
        {moves && !isAscending && <ol key="moves_reverse" reversed>{moves.reverse()}</ol>}
      </div>
    </div>
  );
}

const Board = ({ nextPlay, winner, line, squares, onPlay }) => {
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + nextPlay;
  }

  function handleClick(r, c) {
    if (winner || squares[r][c]) return;

    onPlay(squares, [r, c]);
  }

  return (
    <>
      <div className="status">{status}</div>
      {squares.map((rowArr, c) =>
        <div className="board-row" key={c}>
          {rowArr.map((row, r) =>
            <Square key={r + c * rowArr.length}
              value={squares[r][c]}
              onSquareClick={() => handleClick(r, c)}
              lineSucceed={line && squares[r][c] && line.some(item => r === item[0] && c === item[1])}
            />
          )}
        </div>
      )}
    </>
  );
};

function Square({ value, onSquareClick, lineSucceed }) {
  return (
    <button className={lineSucceed ? 'square strong' : 'square'} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares, position, myWin, AIWin) {
  const nextMyWin = myWin ? [...myWin] : Array(count).fill(0);
  const nextAIWin = AIWin ? [...AIWin] : Array(count).fill(0);
  const nextSquares = squares.map(row => [...row]);
  const [r, c] = position;

  for (let k = 0; k < count; k++) {
    if (wins[r][c][k]) {
      nextMyWin[k]++;
      nextAIWin[k] = number + 1;
      if (nextMyWin[k] === number) {
        return {
          winner: 'X',
          line: lines[k],
          squares: nextSquares,
          position: position,
          myWin: nextMyWin,
          AIWin: nextAIWin
        }
      }
    }
  }

  let myScore = nextSquares.map(row => row.map(col => 0));
  let AIScore = nextSquares.map(row => row.map(col => 0));
  let max = 0;
  let u = 0, v = 0;

  for (let i = 0; i < nextSquares.length; i++) {
    for (let j = 0; j < nextSquares[i].length; j++) {
    }
  }

  for (let i = 0; i < nextSquares.length; i++) {
    for (let j = 0; j < nextSquares[i].length; j++) {
      if (!nextSquares[i][j]) {
        for (let k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            if (nextMyWin[k] === 1) {
              myScore[i][j] += 200;
            } else if (nextMyWin[k] === 2) {
              myScore[i][j] += 400;
            } else if (nextMyWin[k] === 3) {
              myScore[i][j] += 2000;
            } else if (nextMyWin[k] === 4) {
              myScore[i][j] += 10000;
            }

            if (nextAIWin[k] === 1) {
              AIScore[i][j] += 220;
            } else if (nextAIWin[k] === 2) {
              AIScore[i][j] += 420;
            } else if (nextAIWin[k] === 3) {
              AIScore[i][j] += 2100;
            } else if (nextAIWin[k] === 4) {
              AIScore[i][j] += 20000;
            }
          }
        }

        if (myScore[i][j] > max) {
          max = myScore[i][j];
          u = i;
          v = j;
        } else if (myScore[i][j] === max) {
          if (AIScore[i][j] > AIScore[u][v]) {
            u = i;
            v = j;
          }
        }

        if (AIScore[i][j] > max) {
          max = AIScore[i][j];
          u = i;
          v = j;
        } else if (AIScore[i][j] === max) {
          if (myScore[i][j] > myScore[u][v]) {
            u = i;
            v = j;
          }
        }
      }
    }
  }
  nextSquares[u][v] = 'O';

  for (let k = 0; k < count; k++) {
    if (wins[u][v][k]) {
      nextAIWin[k]++;
      nextMyWin[k] = number + 1;
      if (nextAIWin[k] === number) {
        return {
          winner: 'O',
          line: lines[k],
          squares: nextSquares,
          position: position,
          myWin: nextMyWin,
          AIWin: nextAIWin
        }
      }
    }
  }

  return {
    winner: null,
    line: null,
    squares: nextSquares,
    position: position,
    myWin: nextMyWin,
    AIWin: nextAIWin
  }
}

function getWinsLines(row, col, number) {
  var wins = [];
  for (var i = 0; i < row; i++) {
    wins[i] = [];
    for (var j = 0; j < col; j++) {
      wins[i][j] = [];
    }
  }

  let count = 0;
  let lines = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i < col - (number - 1)) { //横线
        lines[count] = [];
        for (let k = 0; k < number; k++) {
          wins[i + k][j][count] = true;
          lines[count].push([i + k, j]);
        }
        count++;
      }

      if (j < col - (number - 1)) { //竖线
        lines[count] = [];
        for (let k = 0; k < number; k++) {
          wins[i][j + k][count] = true;
          lines[count].push([i, j + k]);
        }
        count++;
      }

      if (i < col - (number - 1) && j < col - (number - 1)) { //斜线
        lines[count] = [];
        for (let k = 0; k < number; k++) {
          wins[i + k][j + k][count] = true;
          lines[count].push([i + k, j + k]);
        }
        count++;
      }

      if (i < col - (number - 1) && j > (number - 1) - 1) { //反斜线
        lines[count] = [];
        for (let k = 0; k < number; k++) {
          wins[i + k][j - k][count] = true;
          lines[count].push([i + k, j - k]);
        }
        count++;
      }
    }
  }

  return [count, wins, lines];
}