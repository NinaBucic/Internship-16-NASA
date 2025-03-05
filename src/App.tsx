import ErrorFallback from "./components/ErrorFallback";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <h1>App</h1>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
