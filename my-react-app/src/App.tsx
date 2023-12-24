import React, { useEffect, useState } from 'react';
import { MyTable, TableProps } from './components/Table';
import getTable from './GetTable';
import getData from './API';
import './App.css';


const App: React.FC = () => {
  const { head, table } = getTable(6, 59188n);
  const rows = table.length;
  const cols = table[0].length;
  const initialColors: number[][][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => [255, 255, 255])
  );
  let [cellColors, setCellColors] = useState(initialColors);
  let [tableState, setTableState] = useState(table);
  let [headState, setHeadState] = useState(head);

  const updateTableData = (newProps: TableProps) => {
    const { table, head } = newProps;
    const rows = table.length;
    const cols = table[0].length;
    const initialColors: number[][][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => [255, 255, 255])
    );
    setTableState(table);
    setHeadState(head);
    setCellColors(initialColors);
  };

  // table coloring
  const fillCell = (row: number, col: number, colorRGB: number[]) => {
    const currentColor = cellColors[row][col];
    const newColor = [
      Math.round((currentColor[0] + colorRGB[0]) / 2),
      Math.round((currentColor[1] + colorRGB[1]) / 2),
      Math.round((currentColor[2] + colorRGB[2]) / 2),
    ];

    const newCellColors = [...cellColors];
    newCellColors[row][col] = newColor;
    setCellColors(newCellColors);

    // const cellKey = `cell-${row}-${col}`;
    // console.log(cellKey);
    // const cellElement = document.getElementById(cellKey);
    // if (cellElement) {
    //     console.log(cellElement);
    //     const newColorStyle = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    //     cellElement.style.backgroundColor = newColorStyle;
    // }
  };

  const [variablesCount, setVariablesCount] = useState(2);
  const [functionNumber, setFunctionNumber] = useState(0n);

  const [variablesCountNotState, setVariablesCountNotState] = useState(variablesCount);
  const [functionNumberNotState, setFunctionNumberNotState] = useState(functionNumber);

  const variablesCountInput = <input type={"range"} min={2} max={6} onChange={(event) => (setVariablesCount(parseInt(event.target.value)))} value={variablesCount} />;

  const inputsForm = <form className={'inputs'} onSubmit={(e) => { e.preventDefault() }}>
    <label>Variables count: {variablesCount} {variablesCountInput}</label>
    <label>
      Function number:
      <input type={"number"} min={0} max={variablesCount < 5 ? (1 << (1 << variablesCount)) - 1 : Infinity} onChange={(event) => {
        if (!(event.target.value == "" || event.target.value == undefined)) {
          if (BigInt(event.target.value) < 0n) return setFunctionNumber(0n);
          if (BigInt(event.target.value) > (1n << (1n << BigInt(variablesCount))) - 1n) return setFunctionNumber((1n << (1n << BigInt(variablesCount))) - 1n);
        }
        setFunctionNumber(BigInt(event.target.value))
      }} value={functionNumber.toString()} />
    </label>

    <button onClick={() => {
      setFunctionNumberNotState(functionNumber);
      setVariablesCountNotState(variablesCount);
    }}>Generate table</button>

    <br />
    <button onClick={() => {
      getData(table).then((data: number[][][]) => {
        console.log(data);
        const randomColor = [
          Math.round(Math.random() * 255),
          Math.round(Math.random() * 255),
          Math.round(Math.random() * 255)
        ]
        for (let i = 0; i < data[0].length; i++) {
          fillCell(data[0][i][0], data[0][i][1], randomColor);
          // console.log('cell colors', cellColors);
        }
      });
    }}>Solve</button>
  </form>;

  useEffect(() => {
    // assert(functionNumber == functionNumberNotState);
    let { head, table } = getTable(variablesCountNotState, functionNumberNotState);
    // console.log('functionNumberNotState', functionNumberNotState);
    // console.log('head', head);
    updateTableData({ cellColors: cellColors, table: table, head: head, primaryColStart: 1, primaryColEnd: 10 })
  }, [functionNumberNotState, variablesCountNotState])


  return (
    <div>
      <h1>BDSM maximizer</h1>

      {inputsForm}

      <MyTable head={headState} table={tableState} cellColors={cellColors} primaryColStart={1} primaryColEnd={variablesCountNotState} />

      <button onClick={() => { fillCell(0, 0, [255, 0, 0]) }}>Magic</button>
    </div>
  );
};

export default App;
