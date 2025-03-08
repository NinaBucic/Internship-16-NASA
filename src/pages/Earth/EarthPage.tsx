import { useEffect, useState } from "react";
import { EarthAssetResponse } from "../../types/earthAssets";
import { fetchEarthAssets } from "../../services/earthService";
import { EarthMap } from "../../components/EarthMap";
import "./EarthPage.css";
import { Loader } from "../../components/Loader";

interface FavoriteLocation {
  lat: number;
  lon: number;
  date: string;
  dim: number;
}

export const EarthPage: React.FC = () => {
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [date, setDate] = useState<string>("2020-01-01");
  const [dim, setDim] = useState<number>(0.15);
  const [asset, setAsset] = useState<EarthAssetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<FavoriteLocation[]>(() => {
    const stored = localStorage.getItem("earthFavorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("earthFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleMapClick = (newLat: number, newLon: number) => {
    setLat(newLat);
    setLon(newLon);
  };

  const handleFetchImage = async () => {
    try {
      setLoading(true);
      setError(null);
      setAsset(null);
      const data = await fetchEarthAssets(lon, lat, date, dim);
      setAsset(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setAsset(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    const newFav = { lat, lon, date, dim };
    const alreadyExists = favorites.some(
      (fav) =>
        fav.lat === lat &&
        fav.lon === lon &&
        fav.date === date &&
        fav.dim === dim
    );
    if (alreadyExists) {
      alert("This location is already in favorites!");
      return;
    }
    setFavorites((prev) => [...prev, newFav]);
  };

  const handleLoadFavorite = (fav: (typeof favorites)[number]) => {
    setLat(fav.lat);
    setLon(fav.lon);
    setDate(fav.date);
    setDim(fav.dim);
    setTimeout(() => {
      handleFetchImage();
    }, 0);
  };

  const handleRemoveFavorite = (fav: FavoriteLocation) => {
    setFavorites((prev) =>
      prev.filter(
        (item) =>
          !(
            item.lat === fav.lat &&
            item.lon === fav.lon &&
            item.date === fav.date &&
            item.dim === fav.dim
          )
      )
    );
  };

  return (
    <div className="earth-page-container">
      <h1>Earth Imagery</h1>
      <p className="earth-page-about">
        The satellite passes over each point on earth roughly once every sixteen
        days. Select location by clicking on map or insert, then choose a date
        and dimension to fetch an image url from NASA's Earth Observatory.
      </p>
      <div className="map-and-controls">
        <div className="map-wrapper">
          <EarthMap lat={lat} lon={lon} onLocationChange={handleMapClick} />
        </div>
        <div className="controls">
          <label>
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              value={lon}
              onChange={(e) => setLon(Number(e.target.value))}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            dim (size):
            <input
              type="number"
              step="0.01"
              value={dim}
              onChange={(e) => setDim(Number(e.target.value))}
            />
          </label>
          <button onClick={handleFetchImage}>FETCH</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {loading && <Loader />}
      <div className="earth-page-asset">
        {asset && !loading && (
          <div className="asset-info">
            <p>
              <span>Date:</span> {asset.date}
            </p>
            <p>
              <span>ID:</span> {asset.id}
            </p>
            <p>
              <span>Resource:</span> {asset.resource.dataset}
            </p>
            <a href={asset.url} target="_blank" rel="noopener noreferrer">
              View Earth Observatory
            </a>
            <button onClick={handleAddToFavorites}>ADD TO FAVORITES</button>
          </div>
        )}
      </div>
      <div className="favorites-section">
        <h2>FAVORITES:</h2>
        {favorites.length === 0 ? (
          <p>No favorite locations yet.</p>
        ) : (
          <ul>
            {favorites.map((fav, idx) => (
              <li key={idx}>
                {fav.lat}, {fav.lon} on {fav.date} (dim: {fav.dim})
                <div className="favorites-section-buttons">
                  <button onClick={() => handleLoadFavorite(fav)}>LOAD</button>
                  <button onClick={() => handleRemoveFavorite(fav)}>
                    REMOVE
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
