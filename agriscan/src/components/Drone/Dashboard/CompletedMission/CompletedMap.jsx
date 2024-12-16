// src/components/Index/CompletedMap.jsx
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "79.5vh",
  border: "1px solid #797979",
  boxShadow: "3px 3px 6px 0 rgba(0, 0, 0, 0.65)",
  borderRadius: "4px",
};

const defaultCenter = {
  lat: -34.397,
  lng: 150.644,
};

// Mock waypoints for demonstration
const markers = [
  { id: 1, lat: -34.397, lng: 150.644, info: "Waypoint A" },
  { id: 2, lat: -34.398, lng: 150.645, info: "Waypoint B" },
  { id: 3, lat: -34.396, lng: 150.643, info: "Waypoint C" },
  // Add more waypoints here if needed
];

const CompletedMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={15}
      >
        {/* Render markers for each waypoint */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            // When marker is clicked, set it as the selected marker
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {/* Render InfoWindow if a marker is selected */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.info}</h3>
              <p>
                <strong>Marker ID:</strong> {selectedMarker.id}
              </p>
              <p>
                <strong>Latitude:</strong> {selectedMarker.lat}
              </p>
              <p>
                <strong>Longitude:</strong> {selectedMarker.lng}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default CompletedMap;
