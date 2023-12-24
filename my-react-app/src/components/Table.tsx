import React from 'react';
import './Table.css';


interface TableProps {
    table: string[][]; // table body (<tbody>)
    head: string[]; // table head (<thead>)
    cellColors: number[][][]; // table cell colors
    primaryColStart: number;
    primaryColEnd: number;
}

const MyTable: React.FC<TableProps> = (props: TableProps) => {
    const { table, head, primaryColStart, primaryColEnd, cellColors } = props;
    // get table sizes
    



    // setCellColors(undefined);
    // [cellColors, setCellColors] = useState(initialColors);

    // const fillCell = (row: number, col: number, colorRGB: number[]) => {
    //     const currentColor = cellColors[row][col];
    //     const newColor = [
    //         Math.round((currentColor[0] + colorRGB[0]) / 2),
    //         Math.round((currentColor[1] + colorRGB[1]) / 2),
    //         Math.round((currentColor[2] + colorRGB[2]) / 2),
    //     ];

    //     const newCellColors = [...cellColors];
    //     newCellColors[row][col] = newColor;
    //     setCellColors(newCellColors);

    //     // const cellKey = `cell-${row}-${col}`;
    //     // console.log(cellKey);
    //     // const cellElement = document.getElementById(cellKey);
    //     // if (cellElement) {
    //     //     console.log(cellElement);
    //     //     const newColorStyle = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    //     //     cellElement.style.backgroundColor = newColorStyle;
    //     // }
    // };

    const renderTable = () => {
        const tableRows = cellColors.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((color, colIndex) => {
                    let cellKey;
                    try {
                        cellKey = table[rowIndex][colIndex];
                    } catch (e) { debugger; }

                    const backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    const accent = (255 - Math.min(color[0], color[1], color[2]) / 1.75);
                    const textColor = `rgb(${accent}, ${accent}, ${accent})`;

                    return (
                        <td
                            key={`cell-${rowIndex}-${colIndex}`}
                            style={{ backgroundColor, color: textColor }}
                            className={colIndex >= primaryColStart && colIndex <= primaryColEnd ? 'primary' : ''}
                            // onClick={() => fillCell(rowIndex, colIndex, [255, 0, 0])}
                        >
                            {cellKey}
                        </td>
                    );
                })}
            </tr>
        ));

        return <tbody>{tableRows}</tbody>;
    };

    return (
        <table>
            <thead>
                <tr key={-1}>
                    {head.map((col, index) => {
                        return <th key={`head-${index}`}>{col}</th>;
                    })}
                </tr>
            </thead>
            {renderTable()}
        </table>
    );
};

export { MyTable };
export type { TableProps };

