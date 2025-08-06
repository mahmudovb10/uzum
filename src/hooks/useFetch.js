import axios from "axios";
import { useState, useEffect } from "react";

export const usefetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // <== nomi o‘zgartirildi
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // <== Ispending -> setLoading
      try {
        const req = await axios(url);
        console.log(req);
        setData(req.data); // <== faqat req.data olish kifoya
      } catch (error) {
        console.log(error.message);
        setError(error.message); // <== xatolik holatini saqlash
      } finally {
        setLoading(false); // <== Ispending(false) -> setLoading(false)
      }
    };
    getData();
  }, [url]);

  return { data, loading, error }; // <== loading nomi to‘g‘rilandi
};
