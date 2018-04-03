import React from 'react';
import { create } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Note, { calcRandomBetween } from './Note';

describe('function tests', () => {
    describe('calcRandomBetween tests', () => {
        test('test return 0', () => {
            expect(calcRandomBetween(true)(1,2,3)).toBe(0);
        });

        test('Non-test result', () => {
            expect(calcRandomBetween(false)(0,0,3)).toBe(3);
        });

    });

});

describe('Note snapshots', () => {
    test('Note snapshot test', () => {
        const component = create(
            <Note index={0} onChange={() => null} onRemove={() => null} test>
                Test
            </Note>,
            {
                createNodeMock: (element) => {
                    if (element.type === 'textarea') {
                    // mock focus/select functions
                        return {
                            select: () => null,
                            focus: () => null,
                        };
                    }
                    return null;
                },
            }
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // simulate edit click
        const testInstance = component.root;
        testInstance.findByProps({className:'edit'}).props.onClick();
        tree = component.toJSON();
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