import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [grid, setGrid] = useState([
    { id: 1, isClicked: false, isVisible: true, order: -1 },
    { id: 2, isClicked: false, isVisible: true, order: -1 },
    { id: 3, isClicked: false, isVisible: true, order: -1 },
    { id: 4, isClicked: false, isVisible: true, order: -1 },
    { id: 5, isClicked: false, isVisible: false, order: -1 },
    { id: 6, isClicked: false, isVisible: false, order: -1 },
    { id: 7, isClicked: false, isVisible: true, order: -1 },
    { id: 8, isClicked: false, isVisible: true, order: -1 },
    { id: 9, isClicked: false, isVisible: true, order: -1 },
  ]);
  const counterRef = useRef(0);
  const handleClick = (boxIndex) => {
    counterRef.current++;
    const newGrid = [...grid];
    newGrid[boxIndex].isClicked = true;
    newGrid[boxIndex].order = counterRef.current;
    setGrid(newGrid);
    if (counterRef.current === 7) {
      resetCounter();
    }
  };
  const resetCounter = () => {
    const newGrid = [...grid];
    newGrid.sort((a, b) => a.order - b.order);
    newGrid.forEach((box, i) => {
      setTimeout(() => {
        setGrid((prevGrid) =>
          prevGrid.map((item, id) =>
            item.id === box.id ? { ...item, isClicked: false, order: -1 } : item
          )
        );
      }, i * 1000);
    });
    counterRef.current = 0;
  };
  return (
    <>
      <div className="container">
        {grid.map((el, index) => {
          return el.isVisible ? (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`box ${el.isClicked ? "black" : "white"}`}
            >
              {el.id}
            </div>
          ) : (
            <div></div>
          );
        })}
      </div>
    </>
  );
}
