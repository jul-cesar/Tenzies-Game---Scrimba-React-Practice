import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [tenzies, setTenzies] = useState(false);

  const [dice, setDice] = useState(newDice());

  useEffect(() => {
    const isHeld = dice.every((val) => val.isHeld);
    const sameVal = dice.every((val) => val.value === dice[0].value);

    if (isHeld && sameVal) {
      setTenzies(true);
    }
  }, [dice]);

  function newDice() {
    const arrayNum = [];

    for (let i = 0; i < 10; i++) {
      arrayNum.push({
        value: Math.floor(Math.random() * (6 - 1) + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arrayNum;
  }

  function toggleHeld(id) {
    setDice((prevDice) =>
      prevDice.map((e) => {
        return e.id === id
          ? {
              ...e,
              isHeld: !e.isHeld,
            }
          : e;
      })
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((e) => {
          return e.isHeld
            ? e
            : {
                value: Math.floor(Math.random() * (6 - 1) + 1),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(newDice);
    }
  }
  const diceElements = dice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      held={dice.isHeld}
      toggleHeld={() => toggleHeld(dice.id)}
    />
  ));

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dies-grid">{diceElements}</div>
        <Button roll={rollDice} tenzie={tenzies} />
      </main>
    </div>
  );
}

export default App;
