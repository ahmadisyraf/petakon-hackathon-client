import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>();

  const start = () => setLoading(true);
  const stop = () => setLoading(false);

  return {
    start,
    stop,
    loading,
  };
};

export default useLoading;
