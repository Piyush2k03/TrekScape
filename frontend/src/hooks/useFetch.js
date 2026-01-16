import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);   // <-- FIXED (was [])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result.data);   // <-- backend returns {data: ...}
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
