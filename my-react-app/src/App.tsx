import React, { useEffect, useState } from 'react';
import { MyTable, TableProps } from './components/Table';
import getTable from './GetTable';
import { request } from './API';
import Latex from 'react-latex-next'
import './App.css';

const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

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
    updateStates([]);
  };

  const fillTable = (cellColors: number[][][]) => {
    setCellColors(cellColors);
  }

  // table coloring
  const fillCell = async (row: number, col: number, colorRGB: number[]) => {
    const currentColor = cellColors[row][col];
    const newColor = [
      Math.round((currentColor[0] + colorRGB[0]) / 2),
      Math.round((currentColor[1] + colorRGB[1]) / 2),
      Math.round((currentColor[2] + colorRGB[2]) / 2),
    ];

    const newCellColors = [...cellColors];
    newCellColors[row][col] = newColor;
    await setCellColors(newCellColors);
    console.log("set color for cell", row, col, "to", newColor)
    return newColor;

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

  const tableComponent = <MyTable head={headState} table={tableState} cellColors={cellColors} primaryColStart={1} primaryColEnd={variablesCountNotState} />;

  // saving color states from API
  const [states, updateStates] = useState([] as number[][][][]);
  const [activeState, setActiveState] = useState(0);

  const renderStates =
    <div className={'stateSwitchers'}>
      {
        states.map((state, index) => {
          return (
            <button key={index} className={activeState == index ? 'active' : ''} onClick={
              () => {
                setActiveState(index);
                fillTable(state);
              }
            }>{index + 1}</button>
          )
        })
      }
    </div>

  // const [buttonClicked, setButtonClicked] = useState(false); // helper for update table with data from API using useEffect with buttonClicked dependency

  // update data with API
  const fillWithOneState = async (state: number[][]) => {
    const randomColor = [
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    ]
    for (let i = 0; i < state.length; i++) {
      await fillCell(state[i][0], state[i][1], randomColor);
      console.log("filling cell done", state[i][0], state[i][1], "with color", randomColor)
    }
    console.log("!!!", JSON.parse(JSON.stringify(tableComponent.props.cellColors)));
    await updateStates(states => [...states, JSON.parse(JSON.stringify(tableComponent.props.cellColors))])
    await delay();
    // await new Promise(r => r);
    console.log("requesting useEffect")
    // debugger;
    console.log("function <stopped>")
  }
  // useEffect(() => {
  //   console.log("use effect");
  //   console.log(tableComponent.props.cellColors)
  //   updateStates(states => [...states, tableComponent.props]);
  //   // await new Promise(resolve => {
  //   //   // setButtonClicked(buttonClicked => !buttonClicked);
  //   //   resolve(true);
  //   // });
  // }, [buttonClicked])

  useEffect(() => { setActiveState(states.length - 1); }, [states])

  // latex answers
  const [answer, setAnswer] = useState([] as string[]);

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
    <button
      onClick={async () => {
        const data = (await request(table)).data;
        const answers = (await request(table)).answer;
        for (let stateId = 0; stateId < data.length && stateId >= 0; stateId++) {
          await fillWithOneState(data[stateId]);
          console.log("stateId", stateId, "current colors[2]", states)
        }
        setAnswer(answers);
      }}
    >Solve</button>
  </form>;

  const answersBlock = <div className={'answersBlock'}>
    {
      answer.map((ans, index) => {
        return (
          <div key={index}>
            <h2>Answer {index + 1}</h2>
            <Latex>{"$" + ans + "$"}</Latex>
          </div>
        )
      })
    }
  </div>

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

      {tableComponent}

      {renderStates}

      {answersBlock}

      <button onClick={() => { console.log(states) }}>Magic</button>
    </div>
  );
};

export default App;
