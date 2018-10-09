import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Note from '../components/Note';

Enzyme.configure({
    adapter: new Adapter(),
});

jest.mock('../utils/random');

let wrapper,
    onChange,
    onRemove;
const noteData = {
    id: 1,
    note: 'Test',
};

beforeEach( () => {
    onChange = jest.fn();
    onRemove = jest.fn();
    wrapper = shallow(
        <Note
            index={noteData.id}
            onChange={onChange}
            onRemove={onRemove}
        >
            {noteData.note}
        </Note>
    );
});

describe('Snapshots', () => {
    test('Note snapshot test', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Simulate actions', () => {

    test('Click remove button', () => {
        wrapper.find('.remove').simulate('click');
        expect(onRemove).toHaveBeenLastCalledWith(noteData.id);
    });

    test('Click edit button', () => {

        wrapper.find('.edit').simulate('click');

        expect(wrapper.state('editing')).toBe(true);
        expect(wrapper).toMatchSnapshot();

    });
});
