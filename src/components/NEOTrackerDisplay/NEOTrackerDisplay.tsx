import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { NEOFeedResponse } from "../../types/NEOData";
import "./NEOTrackerDisplay.css";
import { NEOCard } from "../NEOCard";

interface NEOTrackerDisplayProps {
  data: NEOFeedResponse;
}

export const NEOTrackerDisplay: React.FC<NEOTrackerDisplayProps> = ({
  data,
}) => {
  const chartData = Object.keys(data.near_earth_objects).map((date) => ({
    date,
    count: data.near_earth_objects[date].length,
  }));

  return (
    <div className="neo-tracker-container">
      <h1>NEO Tracker</h1>
      <p className="neo-description">
        The following bar chart shows the number of Near Earth Objects detected
        per day over the last few days. Below you can see details about each
        object, including its brightness, miss distance (closest approach to
        Earth), and relative velocity.
      </p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip
              labelStyle={{
                color: "#000",
                fontWeight: "bold",
              }}
            />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="neo-cards-container">
        {Object.entries(data.near_earth_objects).map(([date, neos]) => (
          <div key={date} className="neo-date-group">
            <h3>{date}</h3>
            <hr />
            <div className="neo-cards">{neos.map((neo) => NEOCard(neo))}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
