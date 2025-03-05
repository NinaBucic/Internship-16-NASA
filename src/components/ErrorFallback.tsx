import { FC } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      role="alert"
      style={{ padding: "2rem", textAlign: "center", marginTop: "50px" }}
    >
      <h2>Oops, something went wrong 😢</h2>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary} style={{ marginTop: "20px" }}>
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
