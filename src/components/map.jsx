"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Church,
  Palmtree,
  Landmark,
  Utensils,
  Mountain,
  Camera,
  History,
  ShoppingBag,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Map location types to Lucide React icons
function getIconComponent(type) {
  const iconMap = {
    churches: Church,
    beaches: Palmtree,
    museums: Landmark,
    cuisine: Utensils,
    nature: Mountain,
    landmarks: Camera,
    history: History,
    shopping: ShoppingBag,
  };
  return iconMap[type] || MapPin;
}

function createMarkerElement(type, title) {
  const container = document.createElement("div");
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  `;
  
  // Icon marker
  const el = document.createElement("div");
  el.className = "custom-marker";
  el.style.cssText = `
    width: 32px;
    height: 32px;
    background-color: white;
    border: 2px solid #1e293b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  `;
  
  // Render React icon component into the DOM element
  const IconComponent = getIconComponent(type);
  const root = createRoot(el);
  root.render(<IconComponent size={18} color="#1e293b" />);
  
  // Label with location name
  const label = document.createElement("div");
  label.textContent = title;
  label.style.cssText = `
    margin-top: 4px;
    padding: 2px 6px;
    background-color: white;
    border: 1px solid #1e293b;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #1e293b;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    pointer-events: none;
  `;
  
  container.appendChild(el);
  container.appendChild(label);
  
  return container;
}

function createUserLocationMarker() {
  // User location marker with pulsing effect
  const el = document.createElement("div");
  el.className = "user-location-marker";
  el.style.cssText = `
    width: 40px;
    height: 40px;
    background-color: #3b82f6;
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
    position: relative;
  `;
  
  // Add pulsing animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
      }
    }
    .user-location-marker {
      animation: pulse 2s infinite;
    }
  `;
  document.head.appendChild(style);
  
  // Render User icon
  const root = createRoot(el);
  root.render(<User size={20} color="white" strokeWidth={2.5} />);
  
  return el;
}

export default function Map({ destinations = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to previous destination
  const goToPrevious = () => {
    if (destinations.length === 0) return;
    const newIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    centerMapOn(destinations[newIndex]);
  };

  // Navigate to next destination
  const goToNext = () => {
    if (destinations.length === 0) return;
    const newIndex = currentIndex === destinations.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    centerMapOn(destinations[newIndex]);
  };

  // Center map on a specific destination
  const centerMapOn = (destination) => {
    if (map.current && destination.latitude && destination.longitude) {
      map.current.flyTo({
        center: [destination.longitude, destination.latitude],
        zoom: 12,
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    import("mapbox-gl").then((mapboxgl) => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      
      if (!token) {
        console.error("Mapbox token is not set");
        return;
      }

      mapboxgl.default.accessToken = token;

      // CCIS Coordinates: 18.059779° N, 120.545021° E
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [120.545021, 18.059779], // [longitude, latitude]
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      // Add user location marker at CCIS (mock user location)
      const userLocationMarker = createUserLocationMarker();
      new mapboxgl.default.Marker(userLocationMarker)
        .setLngLat([120.545021, 18.059779])
        .addTo(map.current);

      // Add markers for destinations if provided
      if (destinations && destinations.length > 0) {
        destinations.forEach((dest) => {
          if (dest.latitude && dest.longitude) {
            const el = createMarkerElement(dest.type, dest.title);
            
            const marker = new mapboxgl.default.Marker(el)
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
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Bottom Navigation Control */}
      {destinations.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg border border-slate-200">
            <button
              onClick={goToPrevious}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Previous destination"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            
            <div className="px-2 min-w-[200px] text-center">
              <div className="text-sm font-semibold text-slate-900">
                {destinations[currentIndex]?.title || 'Unknown'}
              </div>
              <div className="text-xs text-slate-500">
                {currentIndex + 1} of {destinations.length}
              </div>
            </div>
            
            <button
              onClick={goToNext}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Next destination"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

