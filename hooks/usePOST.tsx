"use client";
import { useEffect, useState } from "react";

const usePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController>();
  const [result, setResult] = useState<any>(null);

const apiCall = async (path: string, bodyData: Record<string, any> | FormData) => {
  if (controller) controller.abort();

  const newController = new AbortController();
  setController(newController);
  setIsLoading(true);
  setIsError(null);

  try {
    const isFormData = bodyData instanceof FormData;
    const response = await fetch(path, {
      method: "POST",
      headers: isFormData
        ? undefined
        : { "content-type": "application/json;charset=UTF-8" },
      body: isFormData ? bodyData : JSON.stringify(bodyData),
      signal: newController.signal,
    });

    const resData = await response.json();

    if (!response.ok) {
      const errorMsg = resData.error || "Request failed";
      setIsError(errorMsg);
      throw new Error(errorMsg); // ❗ This will trigger toast.error
    }

    setResult(resData);
    setIsError(null);
    return resData.message || "Success"; // ✅ return actual message
  } catch (error: any) {
    if (error.name === "AbortError") {
      setIsError("API aborted");
      throw new Error("API aborted");
    }
    console.error("Error while fetching API:", error);
    setIsError(error.message || "Unknown error");
    throw error; // ✅ Important for toast.promise to catch
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
