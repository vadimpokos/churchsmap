import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./getData.service";
import { CITIES } from "./constants";
import { dataMap } from "./dataMap.utility";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function App() {
  const [cityDirections, setCityDirections] = useState(CITIES[0].directions);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(cityDirections[0], cityDirections[1])
      .then((res) => {
        setData(dataMap(res));
      })
      .catch((er) => console.log(er));
  }, [cityDirections]);

  const handleCitySelect = (e) => {
    const currentCity = e.target.value;
    const currentCityDirections = CITIES.find(
      (item) => item.name === currentCity
    ).directions;
    setCityDirections(currentCityDirections);
  };

  function MapInstance() {
    const map = useMap();
    const mapCenter = map.getCenter();
    if (
      mapCenter.lat !== cityDirections[0] &&
      mapCenter.lng !== cityDirections[1]
    ) {
      map.panTo(cityDirections);
    }
    return null;
  }

  return (
    <>
      <select onChange={handleCitySelect} name="City">
        {CITIES.map((item) => (
          <option
            value={item.name}
            key={item.directions[0] + item.directions[1]}
          >
            {item.name}
          </option>
        ))}
      </select>
      <MapContainer center={cityDirections} zoom={13} scrollWheelZoom={false}>
        <MapInstance />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(data)
          ? data.map((item) => (
              <Marker
                key={item.latitude + item.longitude}
                position={[item.latitude, item?.longitude]}
              >
                <Popup>
                  {item.name}
                  {item.address}
                  {item?.phone}
                  {item.url ? <a href={item.url}>site</a> : null}
                </Popup>
              </Marker>
            ))
          : null}
      </MapContainer>
    </>
  );
}

export default App;
