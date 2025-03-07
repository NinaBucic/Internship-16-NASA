import { useNavigate, useParams } from "react-router-dom";
import { APODItem } from "../../types/APODItem";
import "./APODDetail.css";
import { useEffect, useState } from "react";
import { fetchAPODDataRange } from "../../services/apodService";
import { Loader } from "../../components/Loader";

export const APODDetail: React.FC = () => {
  const navigate = useNavigate();
  const { date } = useParams<{ date: string }>();
  const [data, setData] = useState<APODItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const newData = await fetchAPODDataRange(
          date as string,
          date as string
        );
        setData(newData[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching detail");
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchDetail();
    }
  }, [date]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div style={{ textAlign: "center", margin: "2rem" }}>Error: {error}</div>
    );
  if (!data)
    return (
      <div style={{ textAlign: "center", margin: "2rem" }}>
        No detail available.
      </div>
    );

  return (
    <div className="apod-detail-container">
      <h1>{data.title}</h1>
      <p className="apod-detail-date">{data.date}</p>
      <p className="apod-detail-explanation">{data.explanation}</p>
      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} className="apod-detail-image" />
      ) : data.media_type === "video" ? (
        data.url.includes("youtube.com") || data.url.includes("youtu.be") ? (
          <iframe
            title={data.title}
            src={data.url}
            className="apod-detail-video"
            allowFullScreen
          />
        ) : (
          <div>
            <p>This video cannot be embedded. Please visit the link:</p>
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
          </div>
        )
      ) : null}
      <button
        className="apod-detail-back-button"
        onClick={() => navigate("/apod")}
      >
        GO BACK TO APOD
      </button>
    </div>
  );
};
