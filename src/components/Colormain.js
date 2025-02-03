import { useState, useEffect } from "react";

function Colormain() {
  const [targetColor, setTargetColor] = useState("");
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  function handleClick(selectedColor) {
    if (targetColor === selectedColor) {
      setScore((prevScore) => prevScore + 1);
      setGameStatus("Correct!! 👍");
      setTimeout(() => {
        setGameStatus("");
        newGame();
      }, 1000);
    } else {
      setScore((prevScore) => (prevScore - 1 < 0 ? 0 : prevScore - 1));
      setGameStatus("Wrong! Try again. ❌");
      setTimeout(() => {
        setGameStatus("");
      }, 1500);
    }
  }

  function resetScore() {
    setScore(0);
  }

  function newGame() {
    const newTargetColor = generateRandomColor();
    setTargetColor(newTargetColor);

    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    newColors[Math.floor(Math.random() * 6)] = newTargetColor;
    setColors(newColors);
  }

  useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      <p data-testid="gameInstructions">Guess the correct color! 😁</p>

      <div
        className="color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      ></div>

      <div className="color-options">
        {colors.map((color, index) => (
          <button
            key={index}
            className="color-option"
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color)}
          ></button>
        ))}
      </div>

      <p
        data-testid="gameStatus"
        style={{ color: gameStatus === "Correct!! 👍" ? "green" : "red" }}
      >
        {gameStatus}
      </p>

      <p>
        Score: <span data-testid="score">{score}</span>
      </p>

      <button
        id="newGameButton"
        data-testid="newGameButton"
        onClick={() => {
          newGame();
          resetScore();
        }}
      >
        New Game
      </button>
    </>
  );
}

export default Colormain;
