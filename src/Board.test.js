import React from 'react';
import { create } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Board from './Board';

describe('Board snapshots', () => {
    test('Board snapshot test', () => {
        const component = create(
            <Board notes={[{id:0, note: 'test'}]} test />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Check for render failures', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Board notes={[{id:0, note: 'test'}]} test />
            , div);
    });
});