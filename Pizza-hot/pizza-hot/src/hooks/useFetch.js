// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";

export default function useFetch(url, config = {}) {
  // ① data'yı boş diziyle başlatıyoruz
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // ② GET ise başta loading = true olsun
  const [loading, setLoading] = useState(
    config.method?.toUpperCase() === "GET"
  );

  const sendRequest = useCallback(
    async (body = null) => {
      setLoading(true);
      setError(null);

      try {
        const opts = {
          ...config,
          headers: {
            "Content-Type": "application/json",
            ...(config.headers || {}),
          },
        };
        if (body != null) opts.body = JSON.stringify(body);

        const res = await fetch(url, opts);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || res.statusText);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (config.method?.toUpperCase() === "GET") {
      sendRequest();
    }
  }, [config.method, sendRequest]);

  return { data, error, loading, sendRequest };
}
