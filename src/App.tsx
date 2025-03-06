import AppRouter from "./AppRouter";
import ErrorFallback from "./components/ErrorFallback";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRouter />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
