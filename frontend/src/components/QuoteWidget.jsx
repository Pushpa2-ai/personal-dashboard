// src/components/QuoteCard.jsx
import React, { useEffect, useState } from "react";

function QuoteWidget() {
  const [quote, setQuote] = useState(null);

  const fallbackQuotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  ];

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => setQuote({ text: data.content, author: data.author }))
      .catch(() => {
        // Pick a random fallback quote if API fails
        const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(random);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 h-56 flex items-center justify-center text-center">
      {quote ? (
        <blockquote>
          <p className="italic text-lg">“{quote.text}”</p>
          <footer className="mt-2 text-sm text-gray-500">— {quote.author}</footer>
        </blockquote>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  );
}

export default QuoteWidget;
