export const getRandomNotes = ( count = 0 , { noteData = [] } = {} ) => {
    let result = [];
    for (let x=count; x>0; x--) {
        result = [...result, noteData[x] ];
    }
    return result;
};

export const calcRandomBetween = (x, y, s) => 0;
