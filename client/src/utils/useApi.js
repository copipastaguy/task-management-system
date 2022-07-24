import { useState } from "react";

export default (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   similar to request api
  const request = async (...args) => {
    // setLoading(true);
    try {
      // takes async function
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      //   setLoading(false);
    }
  };

  return {
    data,
    error,
    request,
  };
};
