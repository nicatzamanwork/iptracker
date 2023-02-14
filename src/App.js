import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import icon from "./icon";
import searchicon from "./images/searchicon.png";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Markerposition from "./Markerposition";

function App() {
  const [address, setAddress] = useState(null);
  const [ipaddress, setIpAddress] = useState("");
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(`https://ipapi.co/192.212.174.101/json/`);
        const data = await res.json();
        setAddress(data);
        console.log(data);
      };
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function getEnteredData() {
    const res = await fetch(`https://ipapi.co/96.96.96.0/json/`);

    const data = await res.json();
    setAddress(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredData();
    setIpAddress("");
  };

  return (
    <>
      <section>
        <article>
          <h1>Ip Adress Tracker</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="ipaddress"
              id="ipadress"
              placeholder="Search for any IP"
              required
              value={ipaddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button type="submit">
              <img src={searchicon} id="searchimage" />
            </button>
          </form>
        </article>

        {address && (
          <>
            <article id="infoarticle">
              <div className="infosub">
                <h2>IP Adress</h2>
                <p>{address.ip}</p>
              </div>

              <div className="infosub">
                <h2>Location</h2>
                <p>
                  {address.city},{address.region}
                </p>
              </div>

              <div className="infosub">
                <h2>Time Zone</h2>
                <p>UTC {address.timezone}</p>
              </div>

              <div className="infosub">
                <h2>ISP</h2>
                <p>{address.isp}</p>
              </div>
            </article>

            <MapContainer
              center={[address.latitude, address.longitude]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100vh", width: "100vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <Marker icon={icon} position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
              <Markerposition address={address} />
            </MapContainer>
          </>
        )}
      </section>
    </>
  );
}

export default App;
