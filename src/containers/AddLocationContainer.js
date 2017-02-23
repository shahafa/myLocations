/* eslint-disable react/no-unused-prop-types */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import Snackbar from 'material-ui/Snackbar';
import { addLocation, editLocation } from '../actions/locations';
import AddLocation from '../components/AddLocation';

class AddLocationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    editedLocation: PropTypes.object,
    categories: PropTypes.array.isRequired,
    selectedCoordinates: PropTypes.object.isRequired,
  }

  static defaultProps = {
    open: false,
    location: null,
  }

  state = {
    editMode: false,
    location: {
      id: '',
      name: '',
      address: '',
      longitude: '',
      latitude: '',
      category: '',
    },
    errors: {},
    snackBarOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open) {
      this.setState({
        location: {
          ...this.state.location,
          longitude: nextProps.selectedCoordinates.longitude,
          latitude: nextProps.selectedCoordinates.latitude,
        },
      });
      return;
    }

    const editMode = nextProps.editedLocation !== null;

    this.setState({
      editMode,
      location: {
        id: editMode ? nextProps.editedLocation.id : uuid.v4(),
        name: editMode ? nextProps.editedLocation.name : '',
        address: editMode ? nextProps.editedLocation.address : '',
        longitude: editMode ? nextProps.editedLocation.longitude : '',
        latitude: editMode ? nextProps.editedLocation.latitude : '',
        category: editMode ? nextProps.editedLocation.category : '',
      },
      errors: {},
      snackBarOpen: false,
    });
  }

  onAdd = () => {
    const {
      dispatch,
      onBack,
    } = this.props;

    const {
      editMode,
      location,
    } = this.state;

    let errorFound = false;
    let errors = {};

    if (location.name === '') {
      errors = { ...errors, name: 'Name cannot be empty' };
      errorFound = true;
    }

    if (location.address === '') {
      errors = { ...errors, address: 'Address cannot be empty' };
      errorFound = true;
    }

    if (location.longitude === '') {
      errors = { ...errors, longitude: 'Longitude cannot be empty' };
      errorFound = true;
    } else if (isNaN(location.longitude)) {
      errors = { ...errors, longitude: 'Please enter valid longitude' };
      errorFound = true;
    }

    if (location.latitude === '') {
      errors = { ...errors, latitude: 'Latitude cannot be empty' };
      errorFound = true;
    } else if (isNaN(location.latitude)) {
      errors = { ...errors, latitude: 'Please enter valid Latitude' };
      errorFound = true;
    }

    if (location.category === '') {
      errors = { ...errors, category: 'Category cannot be empty' };
      errorFound = true;
    }

    this.setState({ errors });

    if (errorFound) {
      return;
    }

    if (editMode) {
      dispatch(editLocation(location));
    } else {
      dispatch(addLocation(location));
    }

    this.setState({ snackBarOpen: true });
    onBack();
  }

  handleNameChange = event => this.setState({
    location: { ...this.state.location, name: event.target.value },
    errors: { ...this.state.errors, name: '' },
  });

  handleAddressChange = event => this.setState({
    location: { ...this.state.location, address: event.target.value },
    errors: { ...this.state.errors, address: '' },
  });

  handleLongitudeChange = event => this.setState({
    location: { ...this.state.location, longitude: event.target.value },
    errors: { ...this.state.errors, longitude: '' },
  });

  handleLatitudeChange = event => this.setState({
    location: { ...this.state.location, latitude: event.target.value },
    errors: { ...this.state.errors, latitude: '' },
  });

  handleCategoryChange = (event, index, value) => this.setState({
    location: { ...this.state.location, category: value },
    errors: { ...this.state.errors, category: '' },
  });

  handleSnackBarRequestClose = () => this.setState({ snackBarOpen: false });


  render() {
    const {
      open,
      onBack,
      categories,
    } = this.props;

    const {
      editMode,
      snackBarOpen,
      location,
      errors,
    } = this.state;

    return (
      <div>
        <AddLocation
          open={open}
          onBack={onBack}
          onAdd={this.onAdd}
          editMode={editMode}
          categories={categories}
          location={location}
          onNameValueChange={this.handleNameChange}
          onAddressValueChange={this.handleAddressChange}
          onCategoryValueChange={this.handleCategoryChange}
          onLatitudeValueChange={this.handleLatitudeChange}
          onLongitudeValueChange={this.handleLongitudeChange}
          errors={errors}
        />

        <Snackbar
          open={snackBarOpen}
          message={editMode ? 'Location edited' : 'Location added'}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackBarRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  editedLocation: state.locations.selectedLocation,
  selectedCoordinates: state.locations.selectedCoordinates,
});

export default connect(mapStateToProps)(AddLocationContainer);
