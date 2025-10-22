"use client";
import { useEffect, useState } from "react";

const useGET= () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController>();
  const [result, setResult] = useState<any>(null);

const apiCall = async (path: string) => {
  if (controller) controller.abort();

  const newController = new AbortController();
  setController(newController);
  setIsLoading(true);
  setIsError(null);

  try {
    const response = await fetch(path, {
      signal: newController.signal,
    });

    const resData = await response.json();

    if (!response.ok) {
      const errorMsg = resData.error || "Request failed";
      setIsError(errorMsg);
      throw new Error(errorMsg);
    }

    setResult(resData);
    setIsError(null);
    return resData.message || "Success";
  } catch (error: any) {
    if (error.name === "AbortError") {
      setIsError("API aborted");
      throw new Error("API aborted");
    }
    console.error("Error while fetching API:", error);
    setIsError(error.message || "Unknown error");
    throw error;
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

export default useGET;
