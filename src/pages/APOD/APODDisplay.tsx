import { APODItem } from "../../types/APODItem";
import "./APODDisplay.css";
import { useNavigate } from "react-router-dom";

interface APODDisplayProps {
  data: APODItem[];
}

export const APODDisplay: React.FC<APODDisplayProps> = ({ data }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="no-data">No APOD data available for this date range.</div>
    );
  }

  return (
    <div className="apod-container">
      <h1>APOD</h1>
      <p className="apod-meaning">
        APOD stands for <i>Astronomy Picture of the Day</i>. This page displays
        images and videos from the NASA APOD API.
      </p>
      <div className="apod-gallery">
        {data.map((item) => (
          <div
            key={item.date}
            className="apod-item"
            onClick={() => navigate(`/apod/${item.date}`)}
            style={{ cursor: "pointer" }}
          >
            {item.media_type === "image" ? (
              <img src={item.url} alt={item.title} className="apod-image" />
            ) : item.media_type === "video" ? (
              item.url.includes("youtube.com") ||
              item.url.includes("youtu.be") ? (
                <iframe
                  title={item.title}
                  src={item.url}
                  className="apod-video"
                  allowFullScreen
                />
              ) : (
                <div>
                  <p>This video cannot be embedded. Please visit the link:</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </div>
              )
            ) : (
              <p>Unsupported media type: {item.media_type}</p>
            )}
            <p className="apod-title">{item.title}</p>
            <p className="apod-date">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
