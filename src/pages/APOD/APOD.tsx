import { useEffect, useState } from "react";
import { formatDate, getDefaultDateRange, getNextDateRange } from "../../utils";
import "./APOD.css";
import { APODItem } from "../../types/APODItem";
import { fetchAPODDataRange } from "../../services/apodService";
import { APODDisplay } from "../../components/APODDisplay";
import { Loader } from "../../components/Loader";

export const APOD: React.FC = () => {
  const defaultRange = getDefaultDateRange(20);
  const [startDate, setStartDate] = useState<string>(defaultRange.startDate);
  const [endDate, setEndDate] = useState<string>(defaultRange.endDate);

  const [data, setData] = useState<APODItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const minDate = "1995-06-16";
  const today = formatDate(new Date());

  const loadData = async (
    start: string,
    end: string,
    append: boolean = false
  ) => {
    if (start > end) {
      setError("Start date must be before end date.");
      return;
    }
    if (start < minDate || end > today) {
      setError("Date must be between Jun 16, 1995 and today.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newData = await fetchAPODDataRange(start, end);
      if (newData.length === 0) {
        setHasMore(false);
      }
      if (append) {
        setData((prev) => {
          const combined = [...prev, ...newData];
          const unique = combined.reduce((acc: APODItem[], item) => {
            if (!acc.find((x) => x.date === item.date)) {
              acc.push(item);
            }
            return acc;
          }, []);
          return unique;
        });
      } else {
        setData(newData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(startDate, endDate, false);
  }, [startDate, endDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleClearFilters = () => {
    const defaultRange = getDefaultDateRange(20);
    setStartDate(defaultRange.startDate);
    setEndDate(defaultRange.endDate);
    loadData(defaultRange.startDate, defaultRange.endDate, false);
  };

  const handleLoadMore = () => {
    const nextRange = getNextDateRange(startDate, 20);
    setStartDate(nextRange.startDate);
    loadData(nextRange.startDate, endDate, true);
  };

  return (
    <div className="apod-page-container">
      <h1>APOD</h1>
      <p className="apod-meaning">
        APOD stands for <i>Astronomy Picture of the Day</i>. This page displays
        images and videos from the NASA APOD API.
      </p>
      <div className="filter-container">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          max={endDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          max={today}
          onChange={handleEndDateChange}
        />
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      {error && <div className="error">{error}</div>}
      {loading && data.length === 0 && (
        <div className="initial-loader">
          <Loader />
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="no-data">
          No APOD data available for this date range.
        </div>
      )}
      {loading && data.length > 0 && (
        <div className="load-filter-loader">
          <Loader />
        </div>
      )}
      {data.length > 0 && <APODDisplay data={data} />}
      {loading && data.length > 0 && (
        <div className="load-more-loader">
          <Loader />
        </div>
      )}
      {!loading && hasMore && (
        <div className="load-more-container">
          <button onClick={handleLoadMore}>Load Older Photos</button>
        </div>
      )}
    </div>
  );
};
