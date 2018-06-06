import { getRandomNotes, calcRandomBetween } from "../utils/random";

describe('util function tests', () => {

    describe('Get Random Notes tests', () => {

        test('Returns valid, populated array', () => {
            const test = {noteData : ['1', '2', '3']};
            const length = 2;
            const result = getRandomNotes(length, test);

            expect(result).toHaveLength(2);
            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe('string');
        });

        test('If passed no arguments empty array returned', () => {
            const result = getRandomNotes();
            expect(result).toHaveLength(0);
            expect(Array.isArray(result)).toBe(true);
        });
    });


    describe('calcRandomBetween tests', () => {
        test('Zero values test', () => {
            expect(calcRandomBetween(0,0,'px')).toBe('0px');
        });

    });

});