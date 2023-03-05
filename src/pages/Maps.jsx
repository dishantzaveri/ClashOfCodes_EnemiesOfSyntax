import React, { useRef, useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, Popup, FeatureGroup, withLeaflet } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import mark from "../assets/images/markers.png"
import mymark from "../assets/images/mymarker.png"
import leafletImage from 'leaflet-image';
// import 'leaflet-image/dist/leaflet-image.css';
import { useMapEvents } from 'react-leaflet/hooks'
import { useMap } from 'react-leaflet';
import data from "../data.json"
import { flyTo } from 'leaflet';
import { EditControl } from "react-leaflet-draw"
import useGeoLocation from './useGeoLocation';
import { Polygon } from 'react-leaflet';
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet-easyprint';

function PrintMap() {
  const map = useMap();
  const printControlRef = useRef();

  useEffect(() => {
    if (printControlRef.current) {
      const printOptions = {
        title: 'My Map',
        position: 'topleft',
        sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
        exportOnly: true,
        hideControlContainer: true,
        filename: 'my-map',
        fileType: 'png',
      };

      const printControl = L.easyPrint(printOptions).addTo(map);

      printControlRef.current = printControl;
    }

    return () => {
      if (printControlRef.current) {
        printControlRef.current.remove();
      }
    };
  }, [map]);

  return null;
}



const Maps = () => {


  const [center, setCenter] = useState({
    lat: 13.084,
    lng: 80.24
  });

  const mapRef = useRef();
  const zoomLevel = 4;

  const markerIcon = new L.Icon({
    iconUrl: mark,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46]

  })

  const markerIcon2 = new L.Icon({
    iconUrl: mymark,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46]

  })
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        9,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });

  function onCreated(event) {
    // Access the coordinates of the created feature
    const latlngs = event.layer._latlngs;
    console.log(latlngs);
  }

  function onEdited(event) {
    // Access the coordinates of the edited feature
    const latlngs = event.layers.getLayers()[0]._latlngs;
    console.log(latlngs);
  }


  const [lati, setlati] = useState()
  const [longi, setLongi] = useState()
  // const  create
  return (
    <>
      {/* <Header title="React Leaflet Map Example" /> */}

      {/* <ExternalInfo page="leafletBasic" /> */}

      <div className="relative w-full h-full flex flex-col gap-4 items-center">
        <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
          <PrintMap />
          <FeatureGroup>
            <EditControl
              onCreated={onCreated}
              onEdited={onEdited}
              draw={{
                rectangle: false,
                circle: false,
                polygon: {
                  allowIntersection: false,
                  drawError: {
                    color: "#e1e100",
                    message: "Invalid shape",
                  },
                  shapeOptions: {
                    color: "#97009c",
                  },
                },
              }}
              position="topright"
            />
          </FeatureGroup>
          <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=3DHOohQB1Ufdr3SDSGbf"></TileLayer>
          <Marker position={[13.084, 80.24]} icon={markerIcon}>
            <Popup>
              <b>Live location</b>
            </Popup>
          </Marker>

          {data.map((i, id) => {
            return (
              <Marker position={[i.lat, i.lng]} icon={markerIcon} key={id}>
                <Popup>
                  <b>
                    {i.city} {i.country}
                  </b>
                </Popup>
              </Marker>
            );
          })}
          {location.loaded && !location.error && (
            <Marker
              icon={markerIcon2}
              position={[location.coordinates.lat, location.coordinates.lng]}
            >
              <Popup>
                <b>My location</b>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <button
          className="bg-gray-900 text-emerald-100 text-center px-4 py-2 rounded-xl shadow-lg"
          onClick={showMyLocation}
        >
          Show my location
        </button>

        <h2 className='text-xl p-4'>Want to see the location ?</h2>
        <h3>Add the latitude and longitude :</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
            placeholder="Latitute"
            value={lati}
            type="text"
            onChange={(e) => setlati(e.target.value)}
          />
          <input
            className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
            placeholder="Longitude"
            value={longi}
            onChange={(e) => setLongi(e.target.value)}

            type="text"
          />
        </div>
        <a
          className='bg-emerald-400 p-3 rounded-full'
          href="http://localhost:8080/"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            localStorage.setItem("lat", lati);
            localStorage.setItem("lng", longi);
          }}
        >
          Submit
        </a>
      </div>
    </>
  );
}

export default Maps