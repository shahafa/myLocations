import React from 'react';
import LocationsListContainer from '../containers/LocationsListContainer';
import MapContainer from '../containers/MapContainer';

const styles = {
  container: {
    display: 'flex',
  },

  locationsList: {
    width: '20vw',
    backgroundColor: 'white',
  },

  map: {
    width: '80vw',
  },
};

const LocationsPage = () => (
  <div style={styles.container}>

    <div style={styles.locationsList} className="contentHeight">
      <LocationsListContainer />
    </div>

    <div style={styles.map} className="contentHeight">
      <MapContainer />
    </div>
  </div>
);

export default LocationsPage;
