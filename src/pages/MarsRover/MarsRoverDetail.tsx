import { useNavigate, useParams } from "react-router-dom";
import "./MarsRoverDetail.css";
import { useEffect, useState } from "react";
import { MarsRoverPhoto } from "../../types/marsRoverPhoto";
import { fetchMarsRoverPhotos } from "../../services/marsRoverService";
import { Loader } from "../../components/Loader";
import { ROUTES } from "../../constants/routes";

export const MarsRoverDetail: React.FC = () => {
  const { earthDate, id } = useParams<{ earthDate: string; id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<MarsRoverPhoto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!earthDate || !id) {
        setError("Missing required parameters.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const photos = await fetchMarsRoverPhotos(earthDate, "", 1);
        const found = photos.find((p) => p.id.toString() === id);
        if (found) {
          setPhoto(found);
        } else {
          setError("Photo not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [earthDate, id]);

  if (loading) return <Loader />;

  if (error || !photo)
    return (
      <div className="mars-detail-error">
        <div style={{ textAlign: "center", margin: "2rem" }}>
          {error ? `Error: ${error}` : "Photo not found."}
        </div>
        <button
          className="mars-detail-back-button"
          onClick={() => navigate(ROUTES.MARS_ROVER)}
        >
          GO BACK TO MARS ROVER
        </button>
      </div>
    );

  return (
    <div className="mars-detail-container">
      <div className="mars-detail-info">
        <h1>Mars Rover Photo Details</h1>
        <p>
          <span>Earth Date:</span> {photo.earth_date}
          <br />
          <span>Sol:</span> {photo.sol}
          <br />
          <span>Camera:</span> {photo.camera.full_name}
          <br />
          <span>Rover Status:</span> {photo.rover.status}
          <br />
          <span>Rover Landing Date:</span> {photo.rover.landing_date}
          <br />
          <span>Rover Launch Date:</span> {photo.rover.launch_date}
        </p>
        <button
          className="mars-detail-back-button"
          onClick={() => navigate(ROUTES.MARS_ROVER)}
        >
          GO BACK TO MARS ROVER
        </button>
      </div>
      <div className="mars-detail-media">
        <img
          src={photo.img_src}
          alt={`Photo ${photo.id}`}
          className="mars-detail-photo"
        />
      </div>
    </div>
  );
};
