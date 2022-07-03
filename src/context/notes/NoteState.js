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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZWRhNzAzMTU3YzM3YzQzMGYzOGZlIn0sImlhdCI6MTY1Njc1MjcyOH0.XaLrH8rJBJPM7v-18tAg6-6NCjYIgjX1TAh4ZJWjALU'
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json);
    }
    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZWRhNzAzMTU3YzM3YzQzMGYzOGZlIn0sImlhdCI6MTY1Njc1MjcyOH0.XaLrH8rJBJPM7v-18tAg6-6NCjYIgjX1TAh4ZJWjALU'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "62c02dda22c8776asv3f05fedf4",
            "user": "62beda703157c37c4sa30f38fe",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-07-02T11:36:58.219Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }
    // Delete a Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZWRhNzAzMTU3YzM3YzQzMGYzOGZlIn0sImlhdCI6MTY1Njc1MjcyOH0.XaLrH8rJBJPM7v-18tAg6-6NCjYIgjX1TAh4ZJWjALU'
            },
            body: JSON.stringify({ title, description, tag })
        });

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;