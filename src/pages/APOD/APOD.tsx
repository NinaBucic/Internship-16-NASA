import { fetchDataWithLoad } from "../../hoc/fetchDataWithLoad";
import { fetchAPODData } from "../../services/apodService";
import { APODDisplay } from "./APODDisplay";

export const APOD = fetchDataWithLoad(APODDisplay, fetchAPODData);
