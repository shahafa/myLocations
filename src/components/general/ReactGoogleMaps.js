import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const ReactGoogleMaps = withGoogleMap(({
  zoom,
  center,
  markers,
  onMapClick,
  onMarkerClick,
  onMarkerClose,
}) => (
  <GoogleMap
    zoom={zoom}
    center={center}
    onClick={onMapClick}
    defaultOptions={{
      streetViewControl: false,
      mapTypeControl: false,
    }}
  >
    {markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => onMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow
            onCloseClick={() => onMarkerClose(marker)}
          >
            <div>{marker.content}</div>
          </InfoWindow>
        )}
      </Marker>))
    }
  </GoogleMap>
));

export default ReactGoogleMaps;
