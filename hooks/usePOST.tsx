"use client";
import { useEffect, useState } from "react";

const usePost = <TResult = unknown>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController>();
  const [result, setResult] = useState<TResult | null>(null);

  const apiCall = async (
    path: string,
    bodyData: Record<string, unknown> | FormData
  ): Promise<string> => {
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

      const resData: TResult & { message?: string; error?: string } =
        await response.json();

      if (!response.ok) {
        const errorMsg = resData.error || "Request failed";
        setIsError(errorMsg);
        throw new Error(errorMsg);
      }

      setResult(resData);
      return resData.message || "Success";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setIsError("API aborted");
        throw error;
      }

      const message =
        error instanceof Error ? error.message : "Unknown error";

      setIsError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, [controller]);

  return { isLoading, isError, apiCall, result };
};

export default usePost;
