import React, { PropTypes } from 'react';
import ReactGoogleMaps from './general/ReactGoogleMaps';

const Map = ({
  onMapClick,
  onMarkerClick,
  onMarkerClose,
  markers,
  center,
  zoom,
}) => (
  <ReactGoogleMaps
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    markers={markers}
    onMapClick={onMapClick}
    onMarkerClick={onMarkerClick}
    onMarkerClose={onMarkerClose}
    center={center}
    zoom={zoom}
  />
);

Map.propTypes = {
  onMapClick: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onMarkerClose: PropTypes.func.isRequired,
  markers: PropTypes.array,
  center: PropTypes.object,
  zoom: PropTypes.number,
};

Map.defaultProps = {
  markers: [],
  zoom: 3,
  center: {
    lat: 32,
    lng: 34,
  },
};

export default Map;
