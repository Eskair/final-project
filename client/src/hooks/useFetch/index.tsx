import { useEffect, useState } from 'react';

export const useFetch = (url: string, options = {}) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  //used to trigger refetch on data update
  const [isRefetchRequested, setRefetchRequested] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const { status, data } = await res.json();

        //successful request
        if (status === 200 && data) {
          setData(data);
        }
      } catch (err: any) {
        //failed request
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isRefetchRequested]); // eslint-disable-line

  return { loading, data, error, setRefetchRequested };
};
