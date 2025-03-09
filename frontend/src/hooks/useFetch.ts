import { useEffect, useState } from "react";

class ApiError extends Error {
  public details;
  constructor(message: string, details = {}) {
    super(message);
    this.details = details;
  }
}

function createQueryParams(filters: Record<string, string>) {
  const params = new URLSearchParams();

  for (const key in filters) {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  }

  return "?" + params.toString();
}

export function useFetch(url: string, queryParams: Record<string, string>) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<any>();
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const apiUrl = url + createQueryParams(queryParams);
      try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        console.log("🚀 ~ fetchData ~ data:", data);

        if (data.status >= 400) {
          throw new ApiError(data.message, data.errors);
        }

        setServerError(null);
        setApiData(data);
      } catch (error: any) {
        setServerError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, queryParams]);

  return { isLoading, apiData, serverError };
}
