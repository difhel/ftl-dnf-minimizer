const request = async (array: string[][]): Promise<any> => {
    array;
    // const response = await fetch('http://localhost:3000/api', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(array)
    // });
    // return await response.json();
    return {
        data: [
            [[0, 0], [0, 1], [0, 2], [1, 5]],
            [[2, 0], [2, 1], [2, 2], [2, 5]],
            [[3, 0], [3, 5], [3, 6], [3, 10]]
        ],
        answer: ["a \\wedge b", "b \\wedge c", "a \\vee c"]
    }
}

// const getData = async (array: string[][]): Promise<any> => {
//     const data = await request(array);
//     // one step is list of cells to color
//     // this function returns list of all steps
//     return [
//         [[0, 0], [0, 1], [0, 2], [1, 5]],
//         [[2, 0], [2, 1], [2, 2], [2, 5]],
//         [[3, 0], [3, 5], [3, 6], [3, 10]]
//     ];
// }

// const getAnswer = async (array: string[][]): Promise<any> => {
//     return ["a \\wedge b", "b \\wedge c", "a \\vee c"]
// }

export {request};