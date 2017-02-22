import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCoordinates } from '../actions/locations';
import Map from '../components/Map';

const MapContainer = ({
  locations,
  selectCoordinates,
  selectedLocation,
}) => (
  <Map
    selectCoordinates={selectCoordinates}
    selectedLocation={selectedLocation}
    locations={locations}
  />
);

MapContainer.propTypes = {
  selectCoordinates: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  selectedLocation: PropTypes.object,
};

MapContainer.defaultProps = {
  selectedLocation: null,
};

const mapStateToProps = state => ({
  locations: state.locations.locations,
  selectedLocation: state.locations.selectedLocation,
});

const mapDispatchToProps = {
  selectCoordinates,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
