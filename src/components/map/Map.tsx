"use client";

import React from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Pin } from './Pin';
import type { YardSummary } from '@/lib/types';

interface MapProps {
  yards: YardSummary[];
  selectedYardId?: string;
  onYardSelect?: (yardId: string) => void;
  onYardHover?: (yardId: string | null) => void;
  className?: string;
}

// Custom marker component for yards
interface YardMarkerProps {
  yard: YardSummary;
  isSelected: boolean;
  onSelect: (yardId: string) => void;
  onHover: (yardId: string | null) => void;
}

function YardMarker({ yard, isSelected, onSelect, onHover }: YardMarkerProps) {
  return (
    <AdvancedMarker
      position={{ lat: yard.lat, lng: yard.lng }}
      title={`${yard.name} - $${yard.price}/hour. Press Enter to select.`}
      zIndex={isSelected ? 1000 : 1}
      onClick={() => onSelect(yard.id)}
      onMouseEnter={() => onHover(yard.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* SVG Pin component per spec */}
      <Pin
        isSelected={isSelected}
        size={isSelected ? 'large' : 'default'}
        acres={yard.acres}
        tabIndex={0}
        role="button"
        aria-label={`${yard.name} yard marker. ${yard.acres} acre${yard.acres !== 1 ? 's' : ''}. $${yard.price}/hour. ${yard.fenced ? 'Fenced. ' : ''}${yard.water ? 'Water access available.' : ''}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(yard.id);
          }
        }}
        onClick={() => onSelect(yard.id)}
        onMouseEnter={() => onHover(yard.id)}
        onMouseLeave={() => onHover(null)}
      />
    </AdvancedMarker>
  );
}

export function Map({ 
  yards, 
  selectedYardId, 
  onYardSelect, 
  onYardHover,
  className = '' 
}: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`map-container map-error ${className}`}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: 'var(--bb-ember)'
        }}>
          Google Maps API key not configured
        </div>
      </div>
    );
  }

  // Find selected yard for centering
  const selectedYard = yards.find(y => y.id === selectedYardId);
  
  // Default to Seattle if no yards or selection
  const center = selectedYard 
    ? { lat: selectedYard.lat, lng: selectedYard.lng }
    : { lat: 47.620, lng: -122.320 };

  // Handle keyboard navigation between pins
  const handleMapKeyDown = (event: React.KeyboardEvent) => {
    if (yards.length === 0) return;

    const currentIndex = selectedYardId 
      ? yards.findIndex(yard => yard.id === selectedYardId)
      : -1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % yards.length;
        onYardSelect?.(yards[nextIndex].id);
        break;
      
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex <= 0 ? yards.length - 1 : currentIndex - 1;
        onYardSelect?.(yards[prevIndex].id);
        break;
      
      case 'Escape':
        event.preventDefault();
        onYardSelect?.('');
        break;
      
      case 'Home':
        event.preventDefault();
        if (yards.length > 0) {
          onYardSelect?.(yards[0].id);
        }
        break;
      
      case 'End':
        event.preventDefault();
        if (yards.length > 0) {
          onYardSelect?.(yards[yards.length - 1].id);
        }
        break;
    }
  };

  return (
    <div 
      className={`map-container ${className}`}
      tabIndex={0}
      role="application"
      aria-label={`Interactive map showing ${yards.length} available yards. Use arrow keys to navigate between markers, Enter to select, Escape to clear selection.`}
      onKeyDown={handleMapKeyDown}
    >
      <APIProvider apiKey={apiKey} libraries={['marker']}>
        <GoogleMap
          mapId="trails-and-tails-map"
          center={center}
          defaultZoom={12}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={true}
          zoomControlOptions={{
            position: 9 // RIGHT_CENTER
          }}
          gestureHandling="greedy"
          style={{ width: '100%', height: '100%' }}
        >
          {yards.map((yard) => (
            <YardMarker
              key={yard.id}
              yard={yard}
              isSelected={yard.id === selectedYardId}
              onSelect={(yardId) => {
                onYardSelect?.(yardId);
                // Focus management: scroll corresponding card into view per spec
                setTimeout(() => {
                  const card = document.querySelector(`[data-yard-id="${yardId}"]`) as HTMLElement;
                  card?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 100);
              }}
              onHover={onYardHover || (() => {})}
            />
          ))}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}