import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="icons d-flex justify-content-between">
                        <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id);
                             props.showAlert("Note deleted successfully", "success")}}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
