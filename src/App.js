import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import Sidebar from "./components/Sidebar";
import "./App.css";

const mockFacilities = [
  {
    id: 1,
    name: "Hospital Tuanku Fauziah",
    type: "Hospital",
    address: "Jalan Tun Abdul Razak, 01000 Kangar, Perlis",
    phone: "04-973 8000",
    position: [6.44088077545166, 100.19136810302734],
  },
  {
    id: 2,
    name: "Klinik Kesihatan Kangar",
    type: "Clinic",
    address: "Jalan Pengkalan, 01000 Kangar, Perlis",
    phone: "04-976 3333",
    position: [6.439823, 100.19046],
  },
  {
    id: 3,
    name: "Makmal Kesihatan Awam Perlis",
    type: "Laboratory",
    address: "Jalan Abi Tok Hashim, 01000 Kangar, Perlis",
    phone: "04-976 2833",
    position: [6.4389118, 100.1633229],
  },
  {
    id: 4,
    name: "KPJ Perlis Specialist Hospital",
    type: "Hospital",
    address: "No. 77, Jalan Dato Wan Ahmad, 01000 Kangar, Perlis",
    phone: "04-970 7777",
    position: [6.433203, 100.186455],
  },
  {
    id: 5,
    name: "Klinik Ehsan, Kangar",
    type: "Clinic",
    address: "No. 60, BA, Jalan Kangar - Alor Setar, 01000 Kangar, Perlis",
    phone: "04-976 4408",
    position: [6.446129, 100.207832],
  },
  {
    id: 6,
    name: "Klinik Ehsan",
    type: "Clinic",
    address: "No. 60 Kedai PKENPS, Simpang 3, 01000 Kangar",
    phone: "Not available",
    position: [6.445953, 100.204872],
  },
  {
    id: 7,
    name: "Poliklinik Azhar & Rakan-Rakan (Jejawi Branch)",
    type: "Clinic",
    address: "Kompleks Perniagaan Utara Jejawi, Persiaran Utara, 02600 Arau",
    phone: "04-970 4399",
    position: [6.444713, 100.235977],
  },
  {
    id: 8,
    name: "Klinik Dr Wan Balkis",
    type: "Clinic",
    address: "No. 30 Simpang 3, Kompleks Kedai PKENPS, 01000 Kangar",
    phone: "Not available",
    position: [6.445908, 100.206741],
  },
  {
    id: 9,
    name: "Poliklinik Azhar & Rakan-Rakan (Padang Besar Branch)",
    type: "Clinic",
    address: "Jalan Besar, 02100 Padang Besar",
    phone: "04-949 0698",
    position: [6.660815, 100.320892],
  },
  {
    id: 10,
    name: "Poliklinik Azhar & Rakan-Rakan (Beseri Branch)",
    type: "Clinic",
    address: "No. 17, Jalan Bukit Keteri, Taman Haz Melati, 02450 Beseri",
    phone: "04-938 2257",
    position: [6.5148210525512695, 100.24102783203125],
  },
  {
    id: 11,
    name: "Klinik Dr. Othman",
    type: "Clinic",
    address: "No 18 Lorong Seruling, 01000 Kangar, Perlis",
    phone: "04-9761457",
    position: [6.471883404561156, 100.19473442726394],
  },
  {
    id: 12,
    name: "Klinik Menon",
    type: "Clinic",
    address: "4B, Jalan Raja Syed Alwi, 01000 Kangar, Perlis",
    phone: "04-9761457",
    position: [6.4389136, 100.1942233],
  },
  {
    id: 13,
    name: "Poliklinik Penawar, Kuala Perlis",
    type: "Clinic",
    address: "No. 11, Jalan Sarawak, Taman Bukit Kubu, 02000 Kuala Perlis",
    phone: "04-9852372",
    position: [6.402456, 100.13868],
  },
  {
    id: 14,
    name: "Soleh Dental Laboratory",
    type: "Laboratory",
    address: "16, Lrg Dua 01000 Kangar Perlis",
    phone: "016-527 8934",
    position: [6.424827, 100.209595],
  },
  {
    id: 15,
    name: "Mediquip Sdn Bhd",
    type: "Laboratory",
    address:
      "Batu 5, Padang Lati, Jln. Santan, Kangar, 02450, Kangar, Perlis 02500 Beseri Perlis",
    phone: "04-938 1411",
    position: [6.512467, 100.236817],
  },
  {
    id: 16,
    name: "Klinik Megah Kuala Perlis",
    type: "Clinic",
    address:
      "No 13, Jalan Empat, Kompleks Perniagaan, Kuala Perlis (Perlis) - Jeti Kuah (Pulau Langkawi) 02000 Kampung Perak Perlis",
    phone: "011-5992 0042",
    position: [6.39704, 100.132791],
  },
];

function App() {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setFacilities(mockFacilities);
    setFilteredFacilities(mockFacilities);
    locateUser();
  }, []);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getIcon = (type) => {
    const iconUrl =
      type === "User"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
        : type === "Hospital"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
        : type === "Clinic"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
        : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png";

    return L.icon({
      iconUrl: iconUrl,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredFacilities(facilities);
      return;
    }

    const filtered = facilities.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFacilities(filtered);
  };

  const handleTypeFilter = (types) => {
    if (types.length === 0) {
      setFilteredFacilities(facilities);
      return;
    }

    const filtered = facilities.filter((facility) =>
      types.includes(facility.type)
    );
    setFilteredFacilities(filtered);
  };

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <Sidebar
        onSearch={handleSearch}
        onTypeFilter={handleTypeFilter}
        onThemeToggle={handleThemeToggle}
        theme={theme}
      />
      <div className="main-content">
        <MapContainer
          center={[6.4414, 100.1986]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            errorTileUrl="https://via.placeholder.com/256x256?text=Error"
          />

          {userLocation && (
            <Marker position={userLocation} icon={getIcon("User")}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {filteredFacilities.map((facility) => (
            <Marker
              key={facility.id}
              position={facility.position}
              icon={getIcon(facility.type)}
            >
              <Popup>
                <h3>{facility.name}</h3>
                <p>
                  <strong>Type:</strong> {facility.type}
                </p>
                <p>
                  <strong>Address:</strong> {facility.address}
                </p>
                <p>
                  <strong>Phone:</strong> {facility.phone}
                </p>
                <p>
                  <strong>Coordinates:</strong> {facility.position[0]},{" "}
                  {facility.position[1]}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
