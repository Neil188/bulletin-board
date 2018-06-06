import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Board, {
    nextId, addToArray, removeFromArray, updateArray,
} from '../components/Board';
import testData from '../data/data.json';

Enzyme.configure({
    adapter: new Adapter(),
});

jest.mock('../utils/random');

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

describe('Board snapshots with no local storage', () => {
    test('Board snapshot test', () => {
        const wrapper = shallow(
            <Board />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('Validate note data', () => {
        const wrapper = shallow(
            <Board />,
        );
        expect(wrapper.state('notes')).toHaveLength(5);
        expect(wrapper.state('notes')[0]).toEqual({
            id: 1,
            note: testData.noteData[0],
        });
    });
});

describe('With mock local storage', () => {
    const testNotes = [
        {
            "id":1,
            note:"test",
        },
        {
            "id":2,
            note:"New Note",
        },
    ];
    let wrapper;

    beforeEach( () => {
        localStorage.setItem(
            'bulletin-board',
            JSON.stringify([testNotes[0]])
        );
        wrapper = shallow(
            <Board />,
        );
    });

    test('Board snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('validate note data', () => {
        expect(wrapper.state('notes')).toHaveLength(1);
        expect(wrapper.state('notes')[0]).toEqual(testNotes[0]);
    });

    test('test buttons', () => {
        test('Add note', () => {
            wrapper.find('button').at(0).simulate('click');
            expect(wrapper.state('notes')).toHaveLength(2);
            expect(wrapper.state('notes')).toEqual(testNotes);
        });

        test('Remove all notes', () => {
            wrapper.find('button').at(1).simulate('click');
            expect(wrapper.state('notes')).toHaveLength(0);
        });
    });
});
