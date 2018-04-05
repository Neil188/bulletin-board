import React from 'react';
import { create } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Board, {
    nextId, addToArray, removeFromArray, updateArray, getRandomNotes,
} from './Board';

describe('function tests', () => {
    describe('Next Id tests', () => {
        test('prev = Undefined', () => {
            expect(nextId()).toBe(1);
        });

        test('prev = 1', () => {
            expect(nextId(1)).toBe(2);
        });
    });

    describe('Add to Array tests', () => {

        test('Add to empty array', () => {
            const result = addToArray('Test1', 1)({});
            expect(result.notes).toHaveLength(1);
            expect(result.notes[0].note).toBe('Test1');
        });

        test('Add to populated array', () => {
            const prev = {notes:[{id:1, note:'Test1'}]};
            const result = addToArray('Test2', 2)(prev);
            expect(result.notes).toHaveLength(2);
            expect(result.notes[1].note).toBe('Test2');
        });
    });

    describe('Remove Array tests', () => {

        test('Remove from empty array', () => {
            const prev = {};
            const result = removeFromArray(1)(prev);
            expect(result.notes).toHaveLength(0);
        });

        test('Remove from populated array (id found)', () => {
            const prev = {notes:[{id:1, note:'Test1'}]};
            const result = removeFromArray(1)(prev);
            expect(result.notes).toHaveLength(0);
        });

        test('Remove from populated array (id not found)', () => {
            const prev = {notes:[{id:1, note:'Test1'}]};
            const result = removeFromArray(2)(prev);
            expect(result.notes).toHaveLength(1);
        });
    });

    describe('Update Array tests', () => {

        test('Update empty array', () => {
            const prev = {};
            const result = updateArray('Test', 1)(prev);
            expect(result.notes).toHaveLength(0);
        });

        test('Update populated array (id found)', () => {
            const prev = {notes:[{id:1, note:'Test1'}]};
            const result = updateArray('Update', 1)(prev);
            expect(result.notes).toHaveLength(1);
            expect(result.notes[0].note).toBe('Update');
        });

        test('Update populated array (id not found)', () => {
            const prev = {notes:[{id:1, note:'Not changed'}]};
            const result = updateArray('Update', 2)(prev);
            expect(result.notes).toHaveLength(1);
            expect(result.notes[0].note).toBe('Not changed');
        });
    });

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


});

class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = value;
    }
}
global.localStorage = new LocalStorageMock;
localStorage.setItem('bulletin-board', JSON.stringify([{"id":0, note:"test"}]));

describe('Board snapshots', () => {
    test('Board snapshot test', () => {
        const component = create(
            <Board test />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        const testInstance = component.root;

        // trigger add button
        testInstance.findByProps({id:'add'}).props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // trigger remove on first note
        testInstance.findAllByProps({className:'remove'})[0].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Check for render failures', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Board test />
            , div);
    });
});
