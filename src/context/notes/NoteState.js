import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const InitialNotes = [];
    const [notes, setNotes] = useState(InitialNotes);

    // Get all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    // Delete a Note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;