import axios from "axios";
import { useState, useEffect } from "react";

export const usefetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, Ispending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      Ispending(true);
      try {
        const req = await axios(url);
        console.log(req);
        if (req.status != 200) throw new Error(req.statusText);
        setData(req.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        Ispending(false);
      }
    };
    getData();
  }, [url]);

  return { data, Ispending: loading, error };
};
