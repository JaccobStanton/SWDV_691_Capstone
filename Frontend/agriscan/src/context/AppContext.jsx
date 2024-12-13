// src/context/AppContext.js
import { createContext, useState, useEffect } from "react";
import { getSystems, getSensors } from "../api/api";
import React, { useCallback } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    async function fetchSystems() {
      try {
        setLoading(true);
        const data = await getSystems();
        setSystems(data);
        if (data.length > 0) {
          setSelectedSystem(data[0]); // Default to the first system
        }
      } catch (error) {
        console.error("Failed to fetch systems:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSystems();
  }, []);

  const fetchSensors = useCallback(async () => {
    try {
      const data = await getSensors();
      setSensors(data);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  }, [setSensors]);

  // Add a function to update the system name
  const updateSystemName = (systemId, newName) => {
    setSystems((prevSystems) =>
      prevSystems.map((system) =>
        system.id === systemId ? { ...system, name: newName } : system
      )
    );
    setSelectedSystem((prevSelected) =>
      prevSelected?.id === systemId
        ? { ...prevSelected, name: newName }
        : prevSelected
    );
  };

  return (
    <AppContext.Provider
      value={{
        systems,
        selectedSystem,
        setSelectedSystem,
        loading,
        sensors,
        selectedSensor,
        setSelectedSensor,
        fetchSensors,
        updateSystemName, // Provide the function in the context
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
