import React from "react";
import { Home } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-[#c5b4c5] bg-repeat text-center py-16 relative">
      <Home className="absolute left-8 top-8 w-10 h-10 text-gray-700" />
      <h1 className="text-5xl font-serif tracking-widest text-gray-900">WELCOME BACK</h1>
    </div>
  );
}
