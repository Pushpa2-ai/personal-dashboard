import React, { useState, useEffect } from "react";
import api from "../api/api"; // Uses your JWT axios instance
import { ListTodo, Book, CheckSquare, Target } from "lucide-react";

const API_URL = "events/";

const PersonalCard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [activeType, setActiveType] = useState(null);

  const types = [
    { key: "todo", label: "To-Do", icon: <ListTodo size={28} /> },
    { key: "journal", label: "Journal", icon: <Book size={28} /> },
    { key: "habit", label: "Habit", icon: <CheckSquare size={28} /> },
    { key: "goal", label: "Goal", icon: <Target size={28} /> },
  ];

  // Fetch personal events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get(API_URL);
        setEvents(res.data.filter((e) => e.category.startsWith("personal-")));
      } catch (error) {
        console.error("Error fetching personal events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Add new event
  const addEvent = async () => {
    if (!newEvent.trim() || !activeType) return;

    try {
      const res = await api.post(API_URL, {
        title: newEvent,
        category: `personal-${activeType}`,
      });

      setEvents([res.data, ...events]);
      setNewEvent("");
    } catch (error) {
      console.error("Error adding personal event:", error);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await api.delete(`${API_URL}${id}/`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting personal event:", error);
    }
  };

  // Edit event
  const editEvent = async (id, newTitle) => {
    try {
      const res = await api.put(`${API_URL}${id}/`, {
        title: newTitle,
        category: `personal-${activeType}`,
      });

      setEvents(events.map((e) => (e.id === id ? res.data : e)));
    } catch (error) {
      console.error("Error editing personal event:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="bg-[#c8acc8] text-black p-2 rounded-t-2xl text-center font-bold">
        Personal
      </div>

      {/* Icon Section */}
      <div className="grid grid-cols-4 gap-4 justify-items-center py-4">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveType(t.key)}
            className={`flex flex-col items-center transition-transform hover:scale-125 ${
              activeType === t.key ? "text-purple-600" : "text-gray-600"
            }`}
          >
            {t.icon}
            <span className="text-xs">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Event List */}
      {activeType && (
        <div className="mt-3">
          <h3 className="font-semibold capitalize">
            Personal {activeType}
          </h3>

          <ul className="mt-2 max-h-32 overflow-y-auto">
            {events
              .filter((e) => e.category === `personal-${activeType}`)
              .map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg my-1"
                >
                  <input
                    type="text"
                    defaultValue={event.title}
                    onBlur={(e) => editEvent(event.id, e.target.value)}
                    className="bg-transparent flex-grow outline-none"
                  />
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => deleteEvent(event.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
          </ul>

          {/* Add New Event */}
          <div className="flex mt-2">
            <input
              type="text"
              placeholder={`Add new ${activeType}...`}
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="flex-grow border p-2 rounded-lg"
            />
            <button
              onClick={addEvent}
              className="ml-2 bg-[#c8acc8] text-black px-3 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalCard;
