import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteLocation, selectLocation, clearSelectedLocation, clearSelectedCoordinates } from '../actions/locations';
import LocationsList from '../components/LocationsList';
import AddLocationContainer from './AddLocationContainer';
import ConfirmDialog from '../components/general/ConfirmDialog';

class LocationsListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  }

  state = {
    addLocationOpen: false,
    confirmDialogOpen: false,
    groupBy: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearSelectedLocation());
  }

  handleGroupByClick = () => {
    this.setState({
      groupBy: !this.state.groupBy,
    });
  }

  handleAddLocationClose = () => {
    this.setState({
      addLocationOpen: false,
    });
  }

  handleAddClick = () => {
    const { dispatch } = this.props;
    dispatch(clearSelectedCoordinates());
    dispatch(selectLocation(null));

    this.setState({
      addLocationOpen: true,
    });
  }

  handleEditClick = (location) => {
    const { dispatch } = this.props;
    dispatch(selectLocation(location));

    this.setState({
      addLocationOpen: true,
    });
  }

  handleDeleteClick = (location) => {
    this.setState({
      confirmDialogOpen: true,
      confirmDialogObject: location.id,
      confirmDialogMessage: `Are you sure you want to delete location '${location.name}' ?`,
    });
  }

  handleConfirmDialogConfirm = (locationId) => {
    const { dispatch } = this.props;
    dispatch(deleteLocation(locationId));

    this.setState({ confirmDialogOpen: false });
  }

  handleConfirmDialogClose = () => {
    this.setState({ confirmDialogOpen: false });
  }

  handleLocationItemSelect = (location) => {
    const { dispatch } = this.props;
    dispatch(selectLocation(location));
  }

  render() {
    const {
      locations,
      categories,
    } = this.props;

    const {
      groupBy,
      addLocationOpen,
      confirmDialogOpen,
      confirmDialogMessage,
      confirmDialogObject,
    } = this.state;

    return (
      <div>
        <LocationsList
          locations={locations}
          categories={categories}
          groupBy={groupBy}
          onGroupByClick={this.handleGroupByClick}
          onAddClick={this.handleAddClick}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
          onSelect={this.handleLocationItemSelect}
        />

        <AddLocationContainer
          open={addLocationOpen}
          onBack={this.handleAddLocationClose}
        />

        <ConfirmDialog
          open={confirmDialogOpen}
          message={confirmDialogMessage}
          object={confirmDialogObject}
          ConfirmButtonText="Delete"
          onConfirm={this.handleConfirmDialogConfirm}
          onClose={this.handleConfirmDialogClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(LocationsListContainer);
