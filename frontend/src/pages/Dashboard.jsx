// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/Header";
import PersonalCard from "../components/PersonalCard";
import WorkCard from "../components/WorkCard";
import WeatherWidget from "../components/WeatherWidget";
import TasksToday from "../components/TasksToday";
import TasksWeekly from "../components/TasksWeekly";
import QuoteWidget from "../components/QuoteWidget";
import InspirationCard from "../components/InspirationCard";
import CalendarCard from "../components/CalendarCard";
import NotesCard from "../components/NotesCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header Section */}
      <div>
        <Header />
      </div>

      {/* Divider */}
      <div className="border-b-2 border-purple-400"></div>

      {/* Body Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PersonalCard />
          <WorkCard />
          <CalendarCard />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <TasksToday />
          <TasksWeekly />
          <NotesCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <WeatherWidget />
          <InspirationCard />
          <QuoteWidget />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
