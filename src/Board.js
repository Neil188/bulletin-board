import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import Note from './Note';

export default class Board extends Component {

    state = {
        notes: [],
    };

    componentWillMount() {
        try {
            const retrieveNotes =
                JSON.parse(localStorage.getItem('bulletin-board'));

            if (retrieveNotes) {
                retrieveNotes.forEach( x =>
                    this.add(x.note)
                );
                return;
            }
            console.log('Notes found', retrieveNotes);
        } catch (e) {
            console.error('some kind of error ', e);
        }

        // No notes retrieved from local storage so get some examples
        const self = this;
        fetch(`https://baconipsum.com/api/?type=all-meat&sentences=5`)
            .then(res => res.json())
            .then(json => json[0]
                .split('. ')
                .forEach( sentence =>
                    self.add(sentence.substring(0,25))
                )
            );
    }

    componentDidUpdate() {
        const { notes } = this.state;

        const json = JSON.stringify(notes);
        localStorage.setItem('bulletin-board', json);

    }

    add = (text) => {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text,
                },
            ],
        }));
    }

    addNew = () => this.add('New Note')

    eachNote = (note,i) => (
        <Note
            key={note.id}
            index={note.id}
            onChange={this.update}
            onRemove={this.remove}
        >
            {note.note}
        </Note>
    )

    nextId = () => {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    remove = (id) =>
        this.setState( prevState => ({
            notes: prevState.notes.filter(note =>
                note.id !== id
            ),
        }));

    update = (newText, i) =>
        this.setState( prevState => ({
            notes: prevState.notes.map(
                note => note.id !== i ?
                    note
                    : {...note, note: newText}
            ),
        }) );

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
                <button
                    onClick={this.addNew}
                    id='add'
                >
                    <FaPlus />
                </button>
            </div>
        );
    }
}