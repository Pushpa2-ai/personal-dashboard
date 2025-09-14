import { useEffect, useState } from "react";
import api from "../api/api";  // <-- import the Axios instance

export default function useSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/summary/");  // <-- use api instead of axios
        setSummary(res.data);
      } catch (err) {
        setError(err);
        console.error("Failed to load summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, loading, error };
}
