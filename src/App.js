import React, { useState, useEffect } from "react";
import "./App.css";
import { API, Storage } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from "./graphql/mutations";

const initialFormState = { name: "", description: "" };

function App() {
    const [Notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
    }, []);

    // async function fetchNotes() {
    //     const apiData = await API.graphql({ query: listNotes });
    //     setNotes(apiData.data.listNotes.items);
    // }
    async function fetchNotes() {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(
            notesFromAPI.map(async (note) => {
                if (note.image) {
                    const image = await Storage.get(note.image);
                    note.image = image;
                }
                return note;
            })
        );
        setNotes(apiData.data.listNotes.items);
    }

    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setNotes([...Notes, formData]);
        setFormData(initialFormState);
    }

    async function deleteNote({ id }) {
        const newNotesArray = Notes.filter((Note) => Note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
    }

    async function onChange(e) {
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchNotes();
    }

    return (
        <div className="App">
            <h1>My Notes App</h1>
            <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Note name" value={formData.name} />
            <input
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Note description"
                value={formData.description}
            />
            <input type="file" onChange={onChange} />
            <button onClick={createNote}>Create Note</button>
            <div style={{ marginBottom: 30 }}>
                {Notes.map((Note) => (
                    <div key={Note.id || Note.name}>
                        <h2>{Note.name}</h2>
                        <p>{Note.description}</p>
                        {Note.image && <img src={Note.image} style={{ width: 400 }} />}
                        <container class="center">
                            <button onClick={() => deleteNote(Note)}>Delete Note</button>
                        </container>
                    </div>
                ))}
            </div>
            <AmplifySignOut />
        </div>
    );
}

export default withAuthenticator(App);
