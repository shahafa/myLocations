import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteLocation, selectLocation, clearSelectedLocation, clearSelectedCoordinates } from '../actions/locations';
import LocationsList from '../components/LocationsList';

const LocationsListContainer = ({
  locations,
  deleteLocation,
  selectLocation,
  clearSelectedLocation,
  clearSelectedCoordinates,
  selectedCoordinates,
}) => (
  <LocationsList
    locations={locations}
    onDelete={deleteLocation}
    selectLocation={selectLocation}
    clearSelectedLocation={clearSelectedLocation}
    clearSelectedCoordinates={clearSelectedCoordinates}
    selectedCoordinates={selectedCoordinates}
  />
);

LocationsListContainer.propTypes = {
  locations: PropTypes.array.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  selectLocation: PropTypes.func.isRequired,
  clearSelectedLocation: PropTypes.func.isRequired,
  clearSelectedCoordinates: PropTypes.func.isRequired,
  selectedCoordinates: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  locations: state.locations.locations,
  selectedCoordinates: state.locations.selectedCoordinates,
});

const mapDispatchToProps = {
  deleteLocation,
  selectLocation,
  clearSelectedLocation,
  clearSelectedCoordinates,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsListContainer);
