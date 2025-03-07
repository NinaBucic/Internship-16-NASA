import { Link } from "react-router-dom";
import "./home.css";
import { FC } from "react";
import { ROUTES } from "../../constants/routes";
import planetImage from "../../assets/images/planets-home.png";

export const Home: FC = () => {
  return (
    <div className="home-page">
      <div className="about-wrapper">
        <h1>NASA Explorer</h1>
        <p>
          Welcome to NASA Explorer! This application allows you to explore
          NASA's open APIs: Astronomy Picture of the Day, Mars Rovers, Near
          Earth Objects, and Earth Imagery.
        </p>

        <div>
          <Link to={ROUTES.APOD}>🌌 Astronomy Picture of the Day (APOD)</Link>
          <Link to={ROUTES.MARS_ROVER}>🚀 Mars Rover Photos</Link>
          <Link to={ROUTES.NEO}>🛰️ Near Earth Objects (NEO) Tracker</Link>
          <Link to={ROUTES.EARTH}>🌍 Earth Imagery</Link>
        </div>
      </div>

      <div className="planet-wrapper">
        <img src={planetImage} alt="Planet" className="planet" />
      </div>
    </div>
  );
};
