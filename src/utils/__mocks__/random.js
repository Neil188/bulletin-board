export const getRandomNotes = ( count = 0 , { noteData = [] } = {} ) => {
    let result = [];
    for (let x = 0; x < count; x++) {
        result = [...result, noteData[+x] ];
    }
    return result;
};

export const calcRandomBetween = (_x, _y, _s) => 0;
