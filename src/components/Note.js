import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import { calcRandomBetween } from '../utils/random';

class Note extends Component {

    state = {
        editing: false,
    };

    componentWillMount() {
        this.style = {
            right: calcRandomBetween(0, window.innerWidth - 150, 'px'),
            top: calcRandomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate( ${calcRandomBetween(-25, 25, 'deg')} )`,
        };
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return (
            this.props.children !== nextProps.children ||
            this.state !== nextState
        );
    }

    // componentDidUpdate() {
    //     let textArea;
    //     if (this.state.editing) {
    //         textArea = this.newText;
    //         // textArea.focus();
    //         // textArea.select();
    //     }
    // }

    edit = () => {
        this.setState(() => ({
            editing: true,
        }));
    }

    remove = () =>
        this.props.onRemove(this.props.index);

    save = (e) => {
        e.preventDefault();
        this.props.onChange(this.newText.value, this.props.index);
        this.setState(() => ({
            editing: false,
        }));
    }

    renderForm = () => (
        <Draggable disabled>
            <div>
                <div className='note' style={this.style}>
                    <form onSubmit={this.save}>
                        <textarea
                            ref={ input => {this.newText= input;} }
                            defaultValue={this.props.children}
                            maxLength={40}
                            rows={4}
                        />
                        <button
                            className='save'
                            aria-label='save'
                        >
                            <FaFloppyO />
                        </button>
                    </form>
                </div>
            </div>
        </Draggable>
    )

    renderDisplay = () =>(
        <Draggable>
            <div>
                <div className='note' style={this.style}>
                    <p>{this.props.children}</p>
                    <span>
                        <button
                            onClick={this.edit}
                            className='edit'
                            aria-label='edit'
                        >
                            <FaPencil />
                        </button>
                        <button
                            onClick={this.remove}
                            className='remove'
                            aria-label='remove'
                        >
                            <FaTrash />
                        </button>
                    </span>
                </div>
            </div>
        </Draggable>
    )

    render() {
        return this.state.editing ?
            this.renderForm()
            : this.renderDisplay();
    }
}

Note.propTypes = {
    index: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default Note;
