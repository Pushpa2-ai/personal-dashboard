import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/notes/";

const NotesCard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch notes
  useEffect(() => {
    axios.get(API_URL).then((res) => setNotes(res.data));
  }, []);

  // Add note
  const addNote = async () => {
    if (!newNote) return;
    const res = await axios.post(API_URL, { content: newNote });
    setNotes([res.data, ...notes]);
    setNewNote("");
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Edit note
  const editNote = async (id, newContent) => {
    const res = await axios.put(`${API_URL}${id}/`, { content: newContent });
    setNotes(notes.map((n) => (n.id === id ? res.data : n)));
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 h-56">
      {/* Header */}
      <div className="bg-[#c8acc8] text-black p-2 rounded-t-2xl text-center font-bold">
        Notes
      </div>

      {/* Notes List */}
      <ul className="mt-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg my-1"
          >
            <textarea
              defaultValue={note.content}
              onBlur={(e) => editNote(note.id, e.target.value)}
              className="bg-transparent flex-grow outline-none resize-none"
            />
            <button
              className="text-red-500 ml-2"
              onClick={() => deleteNote(note.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Add Note */}
      <div className="flex mt-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-grow border p-2 rounded-lg"
          placeholder="Write a note..."
        />
        <button
          onClick={addNote}
          className="ml-2 bg-[#c8acc8] text-black px-3 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
