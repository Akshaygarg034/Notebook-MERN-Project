import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleCLick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert('Note added successfully', 'success');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length <3 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleCLick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote
