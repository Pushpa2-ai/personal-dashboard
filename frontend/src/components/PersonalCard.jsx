import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListTodo, Book, CheckSquare, Target } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/events/";

const PersonalCard = () => {
  const [events, setEvents] = useState([]);

  // Fetch personal events
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setEvents(res.data.filter((e) => e.category === "personal"));
    });
  }, []);

  // Add new event
  const addEvent = async (title) => {
    const res = await axios.post(API_URL, { title, category: "personal" });
    setEvents([res.data, ...events]);
  };

  // Delete event
  const deleteEvent = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="bg-[#c8acc8] text-black p-2 rounded-t-2xl text-center font-bold">
        Personal
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => addEvent("New To-Do")}
          className="flex flex-col items-center hover:scale-110 transition-transform"
        >
          <ListTodo className="text-purple-500 w-8 h-8" />
          <span>To-Do</span>
        </button>
        <button
          onClick={() => addEvent("New Journal")}
          className="flex flex-col items-center hover:scale-110 transition-transform"
        >
          <Book className="text-purple-500 w-8 h-8" />
          <span>Journal</span>
        </button>
        <button
          onClick={() => addEvent("New Habit")}
          className="flex flex-col items-center hover:scale-110 transition-transform"
        >
          <CheckSquare className="text-purple-500 w-8 h-8" />
          <span>Habits</span>
        </button>
        <button
          onClick={() => addEvent("New Goal")}
          className="flex flex-col items-center hover:scale-110 transition-transform"
        >
          <Target className="text-purple-500 w-8 h-8" />
          <span>Goals</span>
        </button>
      </div>

      <ul className="mt-4">
        {events.map((event) => (
          <li key={event.id} className="flex justify-between">
            {event.title}
            <button
              className="text-red-500 ml-2"
              onClick={() => deleteEvent(event.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalCard;
