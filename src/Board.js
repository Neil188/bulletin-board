import React, { Component } from 'react';
import Note from './Note';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    id: 33,
                    note: "Note 1",
                },
                {
                    id: 34,
                    note: "Note 2",
                },
                {
                    id: 35,
                    note: "Note 3",
                },
            ],
        };
        this.eachNote = this.eachNote.bind(this);
    }

    eachNote(note,i) {
        return (
            <Note
                key={i}
                index={i}
            >
                {note.note}
            </Note>
        )
    }

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }
}