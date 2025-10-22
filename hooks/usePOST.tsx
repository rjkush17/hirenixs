"use client";
import { useEffect, useState } from "react";

const usePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController>();
  const [result, setResult] = useState<any>(null);

  const apiCall = async (path: string, bodyData: Record<string, any>) => {
    if (controller) {
      controller.abort();
    }

    let newController = new AbortController();
    setController(newController);
    setIsLoading(true);
    setIsError(null);
    try {
            console.log('body Data with the json ---- ',JSON.stringify(bodyData))
    const isFormData = bodyData instanceof FormData
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: isFormData ? bodyData: JSON.stringify(bodyData),
        signal: newController.signal,
      });

      const resData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setIsError(resData.error);
        setResult(null);
        return;
      }
      setResult(resData);
      setIsError(null);
      setIsLoading(false);

      return { isLoading, isError, result };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        setIsError("API aborted");
        return;
      }
      console.log("Error while fetching  API", error);
      setIsError("Error while Sending Request")
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (controller) {
        controller?.abort();
      }
    };
  }, [controller]);

  return { isLoading, isError, apiCall, result };
};

export default usePost;
