import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const ReactGoogleMaps = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoom}
    center={props.center}
    onClick={props.onMapClick}
    defaultOptions={{
      streetViewControl: false,
      mapTypeControl: false,
    }}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow
            onCloseClick={() => props.onMarkerClose(marker)}
          >
            <div>{marker.content}</div>
          </InfoWindow>
        )}
      </Marker>))
    }
  </GoogleMap>
));

export default ReactGoogleMaps;
