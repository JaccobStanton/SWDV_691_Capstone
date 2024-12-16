// src/context/AppContext.js
import { createContext, useState, useEffect, useCallback } from "react";
import { getSystems, getSensors } from "../api/api";

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

  const updateDroneName = (systemId, droneId, newName) => {
    setSystems((prevSystems) => {
      return prevSystems.map((system) => {
        if (system.id === systemId) {
          return {
            ...system,
            drones: system.drones.map((drone) =>
              drone.id === droneId ? { ...drone, name: newName } : drone
            ),
          };
        }
        return system;
      });
    });

    // Also update selectedSystem if it's the currently selected one
    setSelectedSystem((prevSystem) => {
      if (!prevSystem || prevSystem.id !== systemId) return prevSystem;
      return {
        ...prevSystem,
        drones: prevSystem.drones.map((drone) =>
          drone.id === droneId ? { ...drone, name: newName } : drone
        ),
      };
    });
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
        updateDroneName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
