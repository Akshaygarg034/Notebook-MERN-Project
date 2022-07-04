import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

function Note(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleCLick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note updated sucecssfully","success");
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" aria-describedby="emailHelp" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" aria-describedby="emailHelp" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length <3 || note.edescription.length <5} onClick={handleCLick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    )
}

export default Note
