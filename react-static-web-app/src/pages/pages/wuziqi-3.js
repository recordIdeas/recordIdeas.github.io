import { useState, createContext, useContext } from 'react';
import './wuziqi.css';

const NumberContext = createContext(null);
function GameProvider({ children, number }) {
  return (
    <NumberContext.Provider value={number}>
      {children}
    </NumberContext.Provider>
  )
}

export default function Game() {
  const row = 15;
  const col = 15;
  const number = 5;

  const [isAscending, setIsAscending] = useState(true);
  const [history, setHistory] = useState([{
    squares: Array(row).fill(null).map(item => Array(col).fill(null)),
    position: [0, 0]
  }]);

  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const currentPosition = history[currentMove].position;

  function handlePlay(nextSquares, nextPosition) {
    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      position: nextPosition
    }];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.length === 1 ? null : history.map((item, move) => {
    let description;
    const [pos_r, pos_c] = item.position;

    if (move === currentMove) {
      if (move === 0) {
        description = 'You are at game start';
      } else {
        description = 'You are at move (' + pos_r + ', ' + pos_c + ')';
      }

      return (
        <li key={move}><small>{description}</small></li>
      );

    } else {
      if (move === 0) {
        description = 'Go to game start';
      } else {
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
    <GameProvider number={number}>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext}
            squares={currentSquares}
            position={currentPosition}
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
    </GameProvider>
  );
}

function Board({ xIsNext, squares, position, onPlay }) {
  const number = useContext(NumberContext);
  const [winner, line] = calculateWinner(squares, position, number);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(r, c) {
    if (winner || squares[r][c]) return;

    const nextSquares = squares.map(row => [...row]);
    if (xIsNext) {
      nextSquares[r][c] = 'X';
    } else {
      nextSquares[r][c] = 'O';
    }
    onPlay(nextSquares, [r, c]);
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
}

function Square({ value, onSquareClick, lineSucceed }) {
  return (
    <button className={lineSucceed ? 'square strong' : 'square'} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares, position, number) {
  const [pos_r, pos_c] = position;
  const line = squares[pos_r][pos_c] && (  handleLine([+1,  0], [-1,  0])
                                        || handleLine([ 0, +1], [ 0, -1])
                                        || handleLine([+1, +1], [-1, -1])
                                        || handleLine([+1, -1], [-1, +1]) );

  return [line && squares[pos_r][pos_c], line];


  function handleLine(increment1, increment2) {
    let line = calculateLine([position], increment1);
    line = line.length < number ? calculateLine([position], increment2) : line;
    return line.length === number && line;
  }

  function calculateLine(line, increment) {
    const [inc_row, inc_col] = increment;
    let [next_r, next_c] = [pos_r + inc_row, pos_c + inc_col];

    while (line.length < number && squares[next_r] && squares[next_r][next_c] && squares[next_r][next_c] === squares[pos_r][pos_c]) {
      line.push([next_r, next_c]);
      next_r += inc_row;
      next_c += inc_col;
    }

    return line;
  }
}