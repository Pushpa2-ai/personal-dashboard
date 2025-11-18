import React, { useState, useEffect } from "react";
import api from "../api/api"; // <-- important (Uses JWT token)

const API_URL = "events/"; // Because api.js already has baseURL

const NotesCard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(API_URL);
        // Filter only category = "note"
        setNotes(res.data.filter((item) => item.category === "note"));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await api.post(API_URL, {
        title: newNote,
        category: "note",
      });

      setNotes([res.data, ...notes]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await api.delete(`${API_URL}${id}/`);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit note
  const editNote = async (id, newContent) => {
    try {
      const res = await api.put(`${API_URL}${id}/`, {
        title: newContent,
        category: "note",
      });
      setNotes(notes.map((n) => (n.id === id ? res.data : n)));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 h-56">
      <div className="bg-[#c8acc8] text-black p-2 rounded-t-2xl text-center font-bold">
        Notes
      </div>

      <ul className="mt-2 overflow-y-auto max-h-32">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg my-1"
          >
            <textarea
              defaultValue={note.title}
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
