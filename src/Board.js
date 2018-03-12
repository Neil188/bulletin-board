import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import Note from './Note';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.addNew = this.add.bind(this, 'New Note');
    }

    componentWillMount() {
        const self = this;
        if (this.props.count) {
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(res => res.json())
                .then(json => json[0]
                    .split('. ')
                    .forEach( sentence =>
                        self.add(sentence.substring(0,25))
                    )
                );
        }
    }

    add(text) {
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

    eachNote(note,i) {
        return (
            <Note
                key={note.id}
                index={note.id}
                onChange={this.update}
                onRemove={this.remove}
            >
                {note.note}
            </Note>
        );
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    remove(id){
        this.setState( prevState => ({
            notes: prevState.notes.filter(note =>
                note.id !== id
            ),
        }));
    }

    update(newText, i) {
        this.setState( prevState => ({
            notes: prevState.notes.map(
                note => note.id !== i ?
                    note
                    : {...note, note: newText}
            ),
        }) );
    }

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