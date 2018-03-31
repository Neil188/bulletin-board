import React from 'react';
import { create } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Board from './Board';

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

        // trigger add button
        tree.children[1].props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // trigger remove on first note
        tree.children[0].children[0].children[1].children[1].props.onClick();
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
