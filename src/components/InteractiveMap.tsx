import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface Location {
  name: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  phone: string;
  email: string;
}

const officeLocations: Location[] = [
  {
    name: "North America Headquarters",
    region: "New York, USA",
    coordinates: [-74.006, 40.7128],
    address: "123 Business Ave, New York, NY 10001",
    phone: "+1 (212) 555-0100",
    email: "newyork@amovate.com"
  },
  {
    name: "European Operations",
    region: "London, UK",
    coordinates: [-0.1276, 51.5074],
    address: "45 Corporate Street, London, EC1A 1BB",
    phone: "+44 20 7123 4567",
    email: "london@amovate.com"
  },
  {
    name: "Asia-Pacific Office",
    region: "Singapore",
    coordinates: [103.8198, 1.3521],
    address: "88 Market Street, Singapore 048948",
    phone: "+65 6123 4567",
    email: "singapore@amovate.com"
  },
  {
    name: "Middle East Presence",
    region: "Dubai, UAE",
    coordinates: [55.2708, 25.2048],
    address: "Sheikh Zayed Road, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@amovate.com"
  },
  {
    name: "Latin America Office",
    region: "São Paulo, Brazil",
    coordinates: [-46.6333, -23.5505],
    address: "Av. Paulista, 1000, São Paulo, SP",
    phone: "+55 11 3456-7890",
    email: "saopaulo@amovate.com"
  },
  {
    name: "Africa Operations",
    region: "Johannesburg, South Africa",
    coordinates: [28.0473, -26.2041],
    address: "Nelson Mandela Square, Sandton",
    phone: "+27 11 123 4567",
    email: "johannesburg@amovate.com"
  }
];

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [20, 20],
      zoom: 1.5,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each location
    officeLocations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = 'hsl(var(--primary))';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25, className: 'location-popup' })
        .setHTML(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; font-size: 16px; margin-bottom: 8px; color: hsl(var(--foreground));">${location.name}</h3>
            <p style="font-size: 14px; color: hsl(var(--primary)); margin-bottom: 12px; font-weight: 500;">${location.region}</p>
            <div style="font-size: 13px; color: hsl(var(--muted-foreground)); line-height: 1.6;">
              <p style="margin-bottom: 4px;"><strong>Address:</strong><br/>${location.address}</p>
              <p style="margin-bottom: 4px;"><strong>Phone:</strong> ${location.phone}</p>
              <p><strong>Email:</strong> ${location.email}</p>
            </div>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  if (!isTokenSet) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To display the interactive map, please enter your Mapbox public token. You can get one from{' '}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsTokenSet(true)}
            disabled={!mapboxToken}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Load Map
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
