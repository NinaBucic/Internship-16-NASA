import { NEOTrackerDisplay } from "../components/NEOTrackerDisplay";
import { fetchDataWithLoad } from "../hoc/fetchDataWithLoad";
import { fetchNEOData } from "../services/neoService";

export const NEOTracker = fetchDataWithLoad(NEOTrackerDisplay, fetchNEOData);
