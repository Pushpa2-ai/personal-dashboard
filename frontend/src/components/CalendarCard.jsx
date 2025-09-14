import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/events/";

const CalendarCard = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Fetch events
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setEvents(res.data.filter((e) => e.category === "calendar"));
    });
  }, []);

  // Add event
  const addEvent = async () => {
    if (!newEvent || !selectedDate) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
    const res = await axios.post(API_URL, {
      title: newEvent,
      category: "calendar",
      date: dateStr,
    });
    setEvents([res.data, ...events]);
    setNewEvent("");
  };

  // Delete event
  const deleteEvent = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    setEvents(events.filter((e) => e.id !== id));
  };

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Prev / Next month
  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header with month + navigation */}
      <div className="flex justify-between items-center bg-[#c8acc8] text-black p-2 rounded-t-2xl">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h2 className="font-bold">{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const hasEvent = events.some((e) => e.date === dateStr);

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-lg ${
                selectedDate === day ? "bg-purple-300" : "bg-gray-100"
              } ${hasEvent ? "border-2 border-purple-600" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Event section */}
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
                  `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
              )
              .map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between bg-gray-100 p-2 rounded-lg my-1"
                >
                  {event.title}
                  <button
                    className="text-red-500"
                    onClick={() => deleteEvent(event.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
          </ul>

          <div className="flex mt-2">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="flex-grow border p-2 rounded-lg"
              placeholder="New event..."
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
