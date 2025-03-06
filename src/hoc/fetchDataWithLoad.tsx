import { ComponentType, useEffect, useState } from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";
import "./fetchDataWithLoad.css";

type FetchDataFunction<T> = () => Promise<T>;

export interface FetchDataWithLoadProps<T> {
  data: T;
}

export function fetchDataWithLoad<T, P extends FetchDataWithLoadProps<T>>(
  WrappedComponent: ComponentType<P>,
  fetchData: FetchDataFunction<T>
) {
  return (props: Omit<P, keyof FetchDataWithLoadProps<T>>) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetchedData, setFetchedData] = useState<T | null>(null);
    const { error, handleError, resetError } = useErrorHandler();

    useEffect(() => {
      const fetchDataWithLoading = async () => {
        try {
          setIsLoading(true);
          resetError();

          const response = await fetchData();
          setFetchedData(response);
        } catch (error) {
          handleError(
            error instanceof Error ? error : new Error(String(error))
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchDataWithLoading();
    }, []);

    if (isLoading) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      );
    }

    if (error) throw error;

    return <WrappedComponent {...(props as P)} data={fetchedData as T} />;
  };
}
