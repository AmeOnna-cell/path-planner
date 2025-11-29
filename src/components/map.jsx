"use client";

import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({ destinations = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    import("mapbox-gl").then((mapboxgl) => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      
      if (!token) {
        console.error("Mapbox token is not set");
        return;
      }

      mapboxgl.default.accessToken = token;

      // Laoag City coordinates: 18.1978° N, 120.5956° E
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [120.5956, 18.1978], // [longitude, latitude]
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      // Add markers for destinations if provided
      if (destinations && destinations.length > 0) {
        destinations.forEach((dest) => {
          if (dest.latitude && dest.longitude) {
            new mapboxgl.default.Marker()
              .setLngLat([dest.longitude, dest.latitude])
              .addTo(map.current);
          }
        });
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [destinations]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}

