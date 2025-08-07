export const groupDataByRows = <T>(data: T[]): T[][] => {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.reduce((newData: T[][], item: T, index: number) => {
        const rowIndex = Math.floor(index / 3);

        if (!newData[rowIndex]) {
            newData[rowIndex] = []; 
        }

        newData[rowIndex].push(item);
        return newData;
    }, []);
};
