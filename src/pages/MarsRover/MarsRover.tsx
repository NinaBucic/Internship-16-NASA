import { useEffect, useState } from "react";
import { formatDate } from "../../utils";
import { MarsRoverPhoto } from "../../types/marsRoverPhoto";
import { fetchMarsRoverPhotos } from "../../services/marsRoverService";
import { Loader } from "../../components/Loader";
import { MarsRoverDisplay } from "../../components/MarsRoverDisplay";
import "./MarsRover.css";

const availableCameras = [
  "ALL",
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
];

export const MarsRover = () => {
  const today = formatDate(new Date());
  const [earthDate, setEarthDate] = useState<string>(today);
  const [selectedCamera, setSelectedCamera] = useState<string>("ALL");
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<MarsRoverPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const photos = await fetchMarsRoverPhotos(
        earthDate,
        selectedCamera,
        page
      );
      setData(photos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [earthDate, selectedCamera, page]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEarthDate(e.target.value);
    setPage(1);
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="mars-page-container">
      <h1>MARS ROVER PHOTOS</h1>
      <p className="mars-page-about">
        Image data gathered by NASA's Curiosity rover on Mars. Each camera has a
        unique function and perspective.
        <br /> Select a date to view photos taken on that day.
      </p>
      <div className="mars-filter-inputs">
        <label htmlFor="earthDate">Earth Date:</label>
        <input
          type="date"
          id="earthDate"
          value={earthDate}
          max={today}
          onChange={handleDateChange}
        />
        <label htmlFor="cameraSelect">Camera:</label>
        <select
          id="cameraSelect"
          value={selectedCamera}
          onChange={handleCameraChange}
        >
          {availableCameras.map((cam) => (
            <option key={cam} value={cam}>
              {cam}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="no-data">
          No more photos available for the selected date and camera.
        </div>
      ) : (
        <MarsRoverDisplay data={data} />
      )}
      <div className="mars-pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          PREVIOUS
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={data.length === 0}>
          NEXT
        </button>
      </div>
    </div>
  );
};
