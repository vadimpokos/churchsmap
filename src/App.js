import "./App.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { getData } from "./getData";

const CITIES = [
  { name: "New York", directions: [40.73061, -73.935242] },
  { name: "Chicago", directions: [41.881832, -87.623177] },
  { name: "Boston", directions: [42.361145, -71.057083] },
  { name: "Oakland", directions: [37.804363, -122.271111] },
];

function App() {
  const [city, setCity] = useState(CITIES[0].directions);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(city[0], city[1])
      .then((res) => {
        setData(dataMap(res));
        console.log(res);
      })
      .catch((er) => console.log(er));
  }, [city]);

  const dataMap = (data) => {
    return data.map((item) => {
      return {
        latitude: +item.latitude,
        longitude: +item.longitude,
        name: item.name,
        address: item?.church_address_street_address,
        phone: item.phone_number,
        url: item.url ? item.url : null,
      };
    });
  };

  const handleCitySelect = (e) => {
    const currentCity = e.target.value;
    const currentCityDirections = CITIES.find(
      (item) => item.name === currentCity
    ).directions;
    setCity(currentCityDirections);
  };

  function MyComponent() {
    const map = useMap();
    const mapCenter = map.getCenter();
    if (mapCenter.lat !== city[0] && mapCenter.lng !== city[1]) {
      map.panTo(city);
    }

    return null;
  }

  const Map = (center, zoom = 13) => {
    return (
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <MyComponent />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data
          ? data.map((item) => (
              <>
                <Marker position={[item.latitude, item.longitude]}>
                  <Popup>
                    {item.name}
                    {item.address}
                    {item?.phone}
                    {item.url ? <a href={item.url}>site</a> : null}
                  </Popup>
                </Marker>
              </>
            ))
          : null}
      </MapContainer>
    );
  };

  return (
    <>
      <select onChange={handleCitySelect} name="City">
        {CITIES.map((item, index) => (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        ))}
      </select>
      {Map(city)}
    </>
  );
}

export default App;
