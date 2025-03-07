import { useNavigate } from "react-router-dom";
import { MarsRoverPhoto } from "../../types/marsRoverPhoto";
import "./MarsRoverDisplay.css";

interface MarsRoverDisplayProps {
  data: MarsRoverPhoto[];
}

export const MarsRoverDisplay: React.FC<MarsRoverDisplayProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="mars-gallery">
      {data.map((photo) => (
        <div
          key={photo.id}
          className="mars-photo-item"
          onClick={() => navigate(`/mars/${photo.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={photo.img_src}
            alt={`Photo ${photo.id}`}
            className="mars-photo"
          />
          <p className="mars-photo-date">{photo.earth_date}</p>
        </div>
      ))}
    </div>
  );
};
