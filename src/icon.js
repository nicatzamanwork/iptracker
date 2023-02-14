import L from "leaflet";
import icon from "./images/mapicon.png";

export default L.icon({
  iconSize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
});
