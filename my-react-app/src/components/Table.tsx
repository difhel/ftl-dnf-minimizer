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
    console.log('table', table);

    const renderTable = () => {
        const tableRows = cellColors.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((color, colIndex) => {
                    let cellKey = table[rowIndex][colIndex];
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

