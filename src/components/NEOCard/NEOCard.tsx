import { NEOItem } from "../../types/NEOData";
import "./NEOCard.css";

export const NEOCard = (neo: NEOItem) => {
  const approachData = neo.close_approach_data[0];
  const missDistance = approachData?.miss_distance.kilometers || "N/A";
  const relVelocity =
    approachData?.relative_velocity.kilometers_per_hour || "N/A";

  return (
    <div key={neo.id} className="neo-card">
      <h4>{neo.name}</h4>
      <p
        style={{
          color: neo.is_potentially_hazardous_asteroid ? "red" : "green",
        }}
      >
        <span>Hazardous:</span>{" "}
        {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
      </p>
      <p>
        <span>Miss Distance:</span> {missDistance} km
      </p>
      <p>
        <span>Relative Velocity:</span> {relVelocity} km/h
      </p>
      <p>
        <span>Absolute Magnitude:</span> {neo.absolute_magnitude_h}
      </p>
    </div>
  );
};
