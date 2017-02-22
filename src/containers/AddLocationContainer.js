import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLocation, editLocation } from '../actions/locations';
import AddLocation from '../components/AddLocation';

const AddLocationContainer = ({
  open,
  onBack,
  addLocation,
  editLocation,
  categories,
  location,
  selectedCoordinates,
}) => (
  <AddLocation
    open={open}
    onAdd={addLocation}
    onEdit={editLocation}
    onBack={onBack}
    categories={categories}
    location={location}
    selectedCoordinates={selectedCoordinates}
  />
);

AddLocationContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  addLocation: PropTypes.func.isRequired,
  editLocation: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  location: PropTypes.object,
  selectedCoordinates: PropTypes.object.isRequired,
};

AddLocationContainer.defaultProps = {
  location: null,
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  location: state.locations.selectedLocation,
});

const mapDispatchToProps = {
  addLocation,
  editLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationContainer);
