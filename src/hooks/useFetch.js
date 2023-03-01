import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, numofGeoQuiz) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, numofGeoQuiz);
        setData(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [numofGeoQuiz, url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
