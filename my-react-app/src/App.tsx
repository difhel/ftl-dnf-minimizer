import React, { useEffect, useState } from 'react';
import { MyTable, TableProps } from './components/Table';
import getTable from './GetTable';
import './App.css';


const App: React.FC = () => {
  const { head, table } = getTable(6, 59188);
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
  const [variablesCount, setVariablesCount] = useState(2);
  const [functionNumber, setFunctionNumber] = useState(1);

  const [variablesCountNotState, setVariablesCountNotState] = useState(variablesCount);
  const [functionNumberNotState, setFunctionNumberNotState] = useState(functionNumber);

  const variablesCountInput = <input type={"range"} min={2} max={6} onChange={(event) => (setVariablesCount(parseInt(event.target.value)))} value={variablesCount} />;

  const inputsForm = <form className={'inputs'} onSubmit={(e) => {e.preventDefault()}}>
    <label>Variables count: {variablesCount} {variablesCountInput}</label>
    <label>
      Function number:
      <input type={"number"} min={0} max={(1 << (1 << variablesCount)) - 1} onChange={(event) => {
        if (!(event.target.value == "" || event.target.value == undefined)) {
          if (parseInt(event.target.value) < 0) return setFunctionNumber(0);
          if (parseInt(event.target.value) > parseInt(event.target.max)) return setFunctionNumber(parseInt(event.target.max));
        }
        setFunctionNumber(parseInt(event.target.value))
      }} value={functionNumber} />
    </label>

    <button onClick={() => {
      setFunctionNumberNotState(functionNumber);
      setVariablesCountNotState(variablesCount);
    }}>Generate table</button>
  </form>;

  useEffect(() => {
    // assert(functionNumber == functionNumberNotState);
    let { head, table } = getTable(variablesCountNotState, functionNumberNotState);
    console.log('functionNumberNotState', functionNumberNotState);
    console.log('head', head);
    updateTableData({ cellColors: cellColors, table: table, head: head, primaryColStart: 1, primaryColEnd: 10 })
  }, [functionNumberNotState, variablesCountNotState])
  

  return (
    <div>
      <h1>BDSM maximizer</h1>

      {inputsForm}

      <MyTable head={headState} table={tableState} cellColors={cellColors} primaryColStart={1} primaryColEnd={variablesCountNotState} />
    </div>
  );
};

export default App;
