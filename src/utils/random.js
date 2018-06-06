export const getRandomNotes = ( count = 0 , { noteData = [] } = {}) => {
    let result = [];
    for (let x=count; x>0; x--) {
        const random = Math.floor(Math.random() * noteData.length);
        result = [...result, noteData[random] ];
    }
    return result;
};

export const calcRandomBetween = (x, y, s) =>
    x + Math.ceil( Math.random() * (y-x) ) + s;
