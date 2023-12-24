function generateCombinations(variables: string[]): string[] {
    const result: string[] = [];

    function generate(current: string[], start: number) {
        if (current.length > 0) {
            result.push(current.join(''));
        }
        for (let i = start; i < variables.length; i++) {
            generate([...current, variables[i]], i + 1);
        }
    }

    generate([], 0);

    return result.sort((a, b) => a.length - b.length);
}

function generateVariables(count: number): string[] {
    const variables: string[] = [];
    const baseCharCode = 'a'.charCodeAt(0);

    for (let i = 0; i < count; i++) {
        variables.push(String.fromCharCode(baseCharCode + i));
    }
    return variables;
}

function toBinary(bits: number, functionNumber: number): Boolean[] {
    let functionArr: Boolean[] = [];

    while (functionNumber > 0) {
        functionArr.unshift(functionNumber % 2 === 1);
        functionNumber = Math.floor(functionNumber / 2);
    }
    while (bits > functionArr.length) {
        functionArr.unshift(false);
    }
    return functionArr;
}

function transposeMatrix(matrix: string[][]): string[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Initialize the transposed matrix
    const transposed: string[][] = [];

    for (let i = 0; i < cols; i++) {
        transposed[i] = [];
        for (let j = 0; j < rows; j++) {
            transposed[i][j] = matrix[j][i];
        }
    }
    return transposed;
}

function getFunctionArgs(varsCount: number, num: number): Boolean[] {
    return toBinary(varsCount, num);
}

const getTable = (varsCount: number, functionNumber: number) => {
    // debugger;
    const variables = generateVariables(varsCount);
    const head = ["f", ...generateCombinations(variables)];
    const functionValues = toBinary(1 << varsCount, functionNumber);
    let rows: string[][] = [];
    rows.push(functionValues.map((value) => value ? "1" : "0"));
    let table = transposeMatrix(rows);
    for (let i = 0; i < 1 << varsCount; i++) {
        table[i].push(...getFunctionArgs(varsCount, i).map((value) => value ? "1" : "0"));
    }
    for (let i = 0; i < 1 << varsCount; i++) {
        for (let j = 0; j < head.length - varsCount - 1; j++) {
            // table[i].push(`${head[j + varsCount + 1]}`);
            const currentRow = head[j + varsCount + 1];
            let currentRowValue = "";
            for (let k = 0; k < currentRow.length; k++) {
                let variableIndex = variables.indexOf(currentRow[k]);
                // console.log(`index of ${currentRow[k]}: ${variableIndex} ${getFunctionArgs(varsCount, i)[variableIndex]}`);
                let variableValue = getFunctionArgs(varsCount, i)[variableIndex] ? "1" : "0";
                currentRowValue += variableValue;
            }
            table[i].push(`${currentRowValue}`);
        }
    }
    // head.map((value, index) => {
    //     if (index === 0) {
    //         return functionValues.map((value) => value ? "1" : "0");
    //     }
    //     return getFunctionArgs(varsCount, index).map((value) => value ? "1" : "0");
    // });
    return { head, table };
}

export default getTable;