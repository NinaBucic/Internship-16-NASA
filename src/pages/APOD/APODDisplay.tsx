import { APODItem } from "../../types/APODItem";
import "./APODDisplay.css";

interface APODDisplayProps {
  data: APODItem[];
}

export const APODDisplay: React.FC<APODDisplayProps> = ({ data }) => {
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
        {data.map((item) => {
          if (item.media_type === "image") {
            return (
              <div key={item.date} className="apod-item">
                <img src={item.url} alt={item.title} className="apod-image" />
                <p className="apod-title">{item.title}</p>
                <p className="apod-date">{item.date}</p>
              </div>
            );
          } else if (item.media_type === "video") {
            if (
              item.url.includes("youtube.com") ||
              item.url.includes("youtu.be")
            ) {
              return (
                <div key={item.date} className="apod-item">
                  <iframe
                    title={item.title}
                    src={item.url}
                    className="apod-video"
                    allowFullScreen
                  />
                  <p className="apod-title">{item.title}</p>
                  <p className="apod-date">{item.date}</p>
                </div>
              );
            } else {
              return (
                <div key={item.date} className="apod-item">
                  <p>This video cannot be embedded. Please visit the link:</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                  <p className="apod-title">{item.title}</p>
                  <p className="apod-date">{item.date}</p>
                </div>
              );
            }
          } else {
            return (
              <div key={item.date} className="apod-item">
                <p>Unsupported media type: {item.media_type}</p>
                <p className="apod-title">{item.title}</p>
                <p className="apod-date">{item.date}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
