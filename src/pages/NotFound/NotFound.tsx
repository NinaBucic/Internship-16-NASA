import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import astronaut from "../../assets/images/astronaut-lost.png";
import { ROUTES } from "../../constants/routes";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for is lost in space.</p>
        <img src={astronaut} alt="Lost Astronaut" className="astronaut-image" />
        <button onClick={() => navigate(ROUTES.HOME)}>BACK TO HOME</button>
      </div>
    </div>
  );
};
