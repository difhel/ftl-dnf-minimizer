const getData = async (array: string[][]): Promise<any> => {
    // const response = await fetch('http://localhost:3000/api', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(array)
    // });
    // return await response.json();

    // one step is list of cells to color
    // this function returns list of all steps
    return [
        [[0, 0], [0, 1], [0, 2], [1, 5]],
        [[2, 0], [2, 1], [2, 2], [2, 5]],
        [[3, 0], [3, 5], [3, 6], [3, 10]]
    ];
}

export default getData;