import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus';
import Note from './Note';
import defaultNoteData from './data.json';

export const nextId = ( prev ) => {
    const next = (prev || 0) + 1;
    return next;
};

export const addToArray = (value, id) => ({ notes=[] }) => ({
    notes: [
        ...notes,
        {
            id,
            note: value,
        },
    ],
});

export const removeFromArray = (id) => ({ notes=[] }) => ({
    notes: notes.filter(note =>
        note.id !== id
    ),
});

export const updateArray = (newText, i) => ({ notes=[] }) => ({
    notes: notes.map(
        note => note.id !== i ?
            note
            : {...note, note: newText}
    ),
});

export const getRandomNotes = ( count , { noteData }) => {
    let result = [];
    for (let x=count; x>0; x--) {
        const random = Math.floor(Math.random() * noteData.length);
        result = [...result, noteData[random] ];
    }
    return result;
};

export default class Board extends Component {

    state = {
        notes: [],
    };

    componentDidMount() {
        try {
            const retrieveNotes =
                JSON.parse(localStorage.getItem('bulletin-board'));

            if (retrieveNotes) {
                retrieveNotes.forEach( x =>
                    this.add(x.note)
                );

                return;
            }

            if (defaultNoteData) {
                getRandomNotes(5,defaultNoteData).forEach( x =>
                    this.add(x)
                );
            }
        } catch (e) {
            console.error('some kind of error ', e);
        }

    }

    componentDidUpdate() {
        const { notes } = this.state;
        const json = JSON.stringify(notes);
        localStorage.setItem('bulletin-board', json);
    }


    add = (text) => {
        this.uniqueId = nextId(this.uniqueId);
        const addNote = addToArray(text, this.uniqueId);
        this.setState(addNote);
    }

    addNew = () => this.add('New Note')

    eachNote = (note,i) => (
        <Note
            key={note.id}
            index={note.id}
            onChange={this.update}
            onRemove={this.remove}
            test={this.props.test}
        >
            {note.note}
        </Note>
    )

    remove = (id) => {
        const removeNote = removeFromArray(id);
        this.setState(removeNote);
    }

    update = (newText, i) => {
        const updateNote = updateArray(newText, i);
        this.setState( updateNote );
    }

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
                <button
                    onClick={this.addNew}
                    id='add'
                    aria-label='add'
                >
                    <FaPlus />
                </button>
            </div>
        );
    }
}

Board.defaultProps = {
    test: false,
};

Board.propTypes = {
    test: PropTypes.bool,
};
