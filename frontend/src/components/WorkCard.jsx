import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList, FolderKanban, FileText, CalendarDays } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/events/";

const WorkCard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  // Fetch work events
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setEvents(res.data.filter((e) => e.category.startsWith("work-")));
    });
  }, []);

  // Add event
  const addEvent = async () => {
    if (!newEvent || !activeSection) return;
    const res = await axios.post(API_URL, {
      title: newEvent,
      category: `work-${activeSection}`,
    });
    setEvents([res.data, ...events]);
    setNewEvent("");
  };

  // Delete event
  const deleteEvent = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    setEvents(events.filter((e) => e.id !== id));
  };

  // Edit event
  const editEvent = async (id, newTitle) => {
    const res = await axios.put(`${API_URL}${id}/`, { title: newTitle, category: `work-${activeSection}` });
    setEvents(events.map((e) => (e.id === id ? res.data : e)));
  };

  const sections = [
    { key: "tasks", label: "Tasks", icon: <ClipboardList size={28} /> },
    { key: "projects", label: "Projects", icon: <FolderKanban size={28} /> },
    { key: "reports", label: "Reports", icon: <FileText size={28} /> },
    { key: "meetings", label: "Meetings", icon: <CalendarDays size={28} /> },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="bg-[#c8acc8] text-black p-2 rounded-t-2xl text-center font-bold">
        Work
      </div>

      {/* Icons */}
      <div className="grid grid-cols-4 gap-4 justify-items-center py-4">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`flex flex-col items-center transform transition-transform hover:scale-125 ${
              activeSection === section.key ? "text-purple-600" : "text-gray-600"
            }`}
          >
            {section.icon}
            <span className="text-xs">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Event Section */}
      {activeSection && (
        <div className="mt-4">
          <h3 className="font-semibold">Work {activeSection}</h3>
          <ul className="mt-2">
            {events
              .filter((e) => e.category === `work-${activeSection}`)
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

          {/* Add new event */}
          <div className="flex mt-2">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="flex-grow border p-2 rounded-lg"
              placeholder={`Add new ${activeSection}...`}
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

export default WorkCard;
