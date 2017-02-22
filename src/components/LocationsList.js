import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { List } from 'material-ui/List';
import AddIcon from 'material-ui/svg-icons/content/add';
import ReorderIcon from 'material-ui/svg-icons/action/reorder';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import { lightBlueA200 } from 'material-ui/styles/colors';
import AddLocationContainer from '../containers/AddLocationContainer';
import LocationItem from './LocationItem';
import ConfirmDialog from './general/ConfirmDialog';

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: lightBlueA200,
    height: '57px',
  },

  buttons: {
    marginTop: '9px',
  },

  locationList: {
    overflow: 'auto',
    fontFamily: 'Roboto, sans-serif',
  },

  noLocationsFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
    marginBottom: '50px',
  },

  noLocationsFoundIcon: {
    color: 'rgba(0, 0, 0, 0.298039)',
    width: '64px',
    height: '64px',
  },

  noLocationsFoundTitle: {
    marginTop: '25px',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.298039)',
  },
};

class LocationsList extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectLocation: PropTypes.func.isRequired,
    clearSelectedLocation: PropTypes.func.isRequired,
    clearSelectedCoordinates: PropTypes.func.isRequired,
    selectedCoordinates: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const { clearSelectedLocation } = this.props;
    clearSelectedLocation();
  }

  state = {
    addLocationOpen: false,
    selectedLocation: null,
    confirmDialogOpen: false,
    groupBy: false,
  };

  onGroupByClick = () => {
    this.setState({
      groupBy: !this.state.groupBy,
    });
  }

  onAddLocationClose = () => {
    this.setState({
      addLocationOpen: false,
    });
  }

  onAddClick = () => {
    const { selectLocation, clearSelectedCoordinates } = this.props;
    clearSelectedCoordinates();
    selectLocation(null);

    this.setState({
      addLocationOpen: true,
    });
  }

  onEditClick = (location) => {
    const { selectLocation } = this.props;
    selectLocation(location);

    this.setState({
      addLocationOpen: true,
    });
  }

  onDeleteClick = (location) => {
    this.setState({
      confirmDialogOpen: true,
      confirmDialogObject: location.id,
      confirmDialogMessage: `Are you sure you want to delete location '${location.name}' ?`,
    });
  }

  confirmDialogConfirm = (locationId) => {
    const { onDelete } = this.props;
    onDelete(locationId);

    this.setState({ confirmDialogOpen: false });
  }

  confirmDialogClose = () => {
    this.setState({ confirmDialogOpen: false });
  }

  render() {
    const {
      locations,
      selectedCoordinates,
      selectLocation,
   } = this.props;

    const {
      groupBy,
      addLocationOpen,
      confirmDialogOpen,
      confirmDialogMessage,
      confirmDialogObject,
    } = this.state;

    const categories = [];
    locations.forEach((location) => {
      if (!categories.includes(location.category)) {
        categories.push(location.category);
      }
    });
    categories.sort();

    return (
      <div>
        <div style={styles.toolbar}>
          <IconButton
            style={styles.buttons}
            onTouchTap={this.onGroupByClick}
            tooltip={groupBy ? 'Ungroup' : 'Group by Category'}
          >
            <ReorderIcon color="white" />
          </IconButton>

          <IconButton
            style={styles.buttons}
            onTouchTap={this.onAddClick}
            tooltip="Add New Location"
          >
            <AddIcon color="white" />
          </IconButton>
        </div>

        {locations.length === 0 &&
          <div style={styles.noLocationsFound}>
            <LocationIcon style={styles.noLocationsFoundIcon} />
            <div style={styles.noLocationsFoundTitle}>
              <div>No locations</div>
              <div style={{ marginTop: '10px' }}>Use the add button to add new location</div>
            </div>
          </div>
        }

        <div style={styles.locationList} className="locationsListHeight">
          <List>
            {groupBy ?
              categories.map(category =>
                <div key={category}>
                  <Subheader>{category}</Subheader>
                  {locations.filter(location => location.category === category)
                            .map(location =>
                              <LocationItem
                                key={location.id}
                                showCategory={false}
                                location={location}
                                selectLocation={selectLocation}
                                onEditClick={this.onEditClick}
                                onDeleteClick={this.onDeleteClick}
                              />)
                  }
                  {category !== categories[categories.length - 1] && <Divider />}
                </div>)
              :
              locations.map(location =>
                <LocationItem
                  key={location.id}
                  showCategory
                  location={location}
                  selectLocation={selectLocation}
                  onEditClick={this.onEditClick}
                  onDeleteClick={this.onDeleteClick}
                />)
            }
          </List>
        </div>

        <AddLocationContainer
          open={addLocationOpen}
          onBack={this.onAddLocationClose}
          selectedCoordinates={selectedCoordinates}
        />

        <ConfirmDialog
          open={confirmDialogOpen}
          message={confirmDialogMessage}
          object={confirmDialogObject}
          ConfirmButtonText="Delete"
          onConfirm={this.confirmDialogConfirm}
          onClose={this.confirmDialogClose}
        />
      </div>
    );
  }
}

export default LocationsList;
