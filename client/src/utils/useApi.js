import { useState } from "react";

export const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   similar to request api
  const request = async (params) => {
    // setLoading(true);
    try {
      // takes async function
      const result = await apiFunc(...params);
      setData(result.data);
    } catch (err) {
      setError(data.error || "Unexpected Error!");
    } finally {
    }
  };

  return {
    data,
    error,
    request,
  };
};
