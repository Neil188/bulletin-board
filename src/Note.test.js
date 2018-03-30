import React from 'react';
import { create } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Note from './Note';

describe('Note snapshots', () => {
    test('Note snapshot test', () => {
        const component = create(
            <Note index={0} onChange={() => null} onRemove={() => null} test>
                Test
            </Note>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Check for render failures', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Note index={0} onChange={() => null} onRemove={() => null} test>
                Test
            </Note>
            , div);
    });
});