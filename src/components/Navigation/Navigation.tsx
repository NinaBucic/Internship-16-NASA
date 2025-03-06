import { ROUTES } from "../../constants/routes";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./navigation.css";

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="nav-header">
      <nav className="nav-links">
        <Link to={ROUTES.HOME} className="nav-link">
          HOME
        </Link>
        <Link to={ROUTES.APOD} className="nav-link">
          APOD
        </Link>
        <Link to={ROUTES.MARS_ROVER} className="nav-link">
          MARS
        </Link>
        <Link to={ROUTES.NEO} className="nav-link">
          NEO
        </Link>
        <Link to={ROUTES.EARTH} className="nav-link">
          EARTH
        </Link>
      </nav>
      <label
        htmlFor="toggleSwitch"
        title="toggle switch"
        className="toggleSwitch"
      >
        <input
          id="toggleSwitch"
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="themeSlider" />
      </label>
    </header>
  );
};
