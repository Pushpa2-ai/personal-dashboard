import React, { useState, useEffect } from "react";
import api from "../api/api";

const API_URL = "events/";

const CalendarCard = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Fetch calendar events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get(API_URL);
        setEvents(res.data.filter((e) => e.category === "calendar"));
      } catch (error) {
        console.error("Calendar fetch error:", error);
      }
    };
    fetchEvents();
  }, []);

  // Add event
  const addEvent = async () => {
    if (!newEvent.trim() || !selectedDate) return;

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDate).padStart(2, "0")}`;

    try {
      const res = await api.post(API_URL, {
        title: newEvent,
        category: "calendar",
        date: dateStr,
      });

      setEvents([res.data, ...events]);
      setNewEvent("");
    } catch (error) {
      console.error("Add event error:", error);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await api.delete(`${API_URL}${id}/`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Edit event title
  const editEvent = async (id, newTitle) => {
    try {
      const updated = await api.put(`${API_URL}${id}/`, {
        title: newTitle,
        category: "calendar",
        date: events.find((e) => e.id === id).date,
      });

      setEvents(events.map((e) => (e.id === id ? updated.data : e)));
    } catch (error) {
      console.error("Edit event error:", error);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const changeMonth = (offset) => {
    let m = currentMonth + offset;
    let y = currentYear;

    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }

    setCurrentMonth(m);
    setCurrentYear(y);
    setSelectedDate(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#c8acc8] text-black p-2 rounded-t-2xl">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h2 className="font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const hasEvent = events.some((e) => e.date === dateStr);

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-lg transition ${
                selectedDate === day ? "bg-purple-300" : "bg-gray-100"
              } ${hasEvent ? "border-2 border-purple-600" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Events list & Add form */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-semibold">
            Events on {selectedDate} {monthNames[currentMonth]} {currentYear}
          </h3>

          <ul className="mt-2">
            {events
              .filter(
                (e) =>
                  e.date ===
                  `${currentYear}-${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(selectedDate).padStart(2, "0")}`
              )
              .map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg my-1"
                >
                  <input
                    type="text"
                    defaultValue={event.title}
                    className="bg-transparent flex-grow outline-none"
                    onBlur={(e) => editEvent(event.id, e.target.value)}
                  />
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 ml-2"
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
              placeholder="Add new event..."
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

export default CalendarCard;
