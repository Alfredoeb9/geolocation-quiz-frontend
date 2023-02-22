import { useEffect, useState } from "react";
import axios from "axios";

const usePostFetch = (url, numofGeoQuiz) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(numofGeoQuiz),
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();
        // const response = await axios.post(url);
        //   {
        //     method: "POST",
        //     body: JSON.stringify(numofGeoQuiz),
        //     headers: {
        //       "Content-Type": "application/json",
        //       // Authorization: `Bearer ${user.token}`,
        //     },
        //   }
        setData(json);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [numofGeoQuiz, url]);

  const rePostFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(numofGeoQuiz),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { data, loading, error, rePostFetch };
};

export default usePostFetch;
