import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Box from './components/BoxComponent';

function App() {
  const [values, setValues] = useState(['', '', '', '', '', '', '', '', '']);
  const [playerHistory, setPlayerHistory] = useState({ x: [], o: [] });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [winner, setWinner] = useState(false);
  const [player, setPlayer] = useState('X');

  const winningCombos = ['012', '345', '678', '036', '147', '258', '048', '246'];

  useEffect(() => {
    const win = winningCombos.map((win, index) => {
      // regex to check either one of the value matches the string
      // . represent any single character
      // ? represent zero or one of the character
      const reg = new RegExp('.?' + win[0] + '.?' + win[1] + '.?' + win[2] + '.?');
  
      const checking = Object.values(playerHistory).map((combo, index) =>
        reg.test(combo) === true ? index : null)
        .filter(x => x !== null).toString();
  
      return (checking === '0' || checking === '1') ? true : false;
    }).filter(x => !!x);

    if (win.length > 0 || typeof win === Boolean) {
      setWinner(win[0]);
    }
  }, [playerHistory]);


  const handleBoxClick = (index) => {
    let newValues = [...values];
    newValues[index] = player;
    setValues(newValues);
    setCurrentIndex(index);
    
    setPlayerHistory(prevState => (
      player === 'X' ?
      {
        x: [...prevState.x, index].sort().join(''),
        o: prevState.o,
      } : {
        x: prevState.x,
        o: [...prevState.o, index].sort().join('')
      }
    ));

    setPlayer(player === 'X' ? 'O' : 'X');
  }

  const resetGame = () => {
    setValues(['', '', '', '', '', '', '', '', '']);
    setPlayer('X');
    setPlayerHistory({ x: [], o: [] });
    setWinner(false);
  }

  return (
    <>
      {winner && (<p> {`We have our winner! It is ${values[currentIndex]} !!!`} </p>)}
      <button onClick={resetGame}>Start Game</button>
      <div className="tictactoe">
        {values.map((data, index) => (<Box key={index} value={data}
          onClick={
            data === '' && !winner
          ? () => { handleBoxClick(index) }
              : null} />))
        }
      </div>
    </>
  );
}

export default App;
