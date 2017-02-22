/* eslint-disable react/no-unused-prop-types */

import React, { Component, PropTypes } from 'react';
import uuid from 'node-uuid';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { lightBlueA200 } from 'material-ui/styles/colors';

const styles = {
  drawer: {
    top: '64px',
    zIndex: 1,
    boxShadow: '',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: lightBlueA200,
    height: '57px',
  },

  backButton: {
    marginTop: '9px',
  },

  title: {
    color: 'white',
    marginTop: '24px',
    marginLeft: '5px',
  },

  content: {
    marginLeft: '24px',
    marginRight: '24px',
  },

  textField: {
    width: '100%',
  },

  addButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '40px',
  },

  useMapTitle: {
    color: 'rgba(0, 0, 0, 0.298039)',
    fontSize: '12px',
    marginTop: '25px',
  },
};

class AddLocation extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    location: PropTypes.object,
    selectedCoordinates: PropTypes.object.isRequired,
  }

  static defaultProps = {
    open: false,
    location: null,
  }

  state = {
    editMode: false,
    snackBarOpen: false,
    name: '',
    address: '',
    longitude: '',
    latitude: '',
    category: '',
  };

  componentWillReceiveProps(nextProps) {
    if (this.isOpen) {
      this.setState({
        longitude: nextProps.selectedCoordinates.longitude,
        latitude: nextProps.selectedCoordinates.latitude,
      });
      return;
    }

    if (nextProps.open) {
      this.isOpen = true;
    }

    const editMode = nextProps.location;
    this.setState({
      editMode,
      id: editMode ? nextProps.location.id : '',
      name: editMode ? nextProps.location.name : '',
      address: editMode ? nextProps.location.address : '',
      longitude: editMode ? nextProps.location.longitude : '',
      latitude: editMode ? nextProps.location.latitude : '',
      category: editMode ? nextProps.location.category : '',
      nameErrorText: '',
      addressErrorText: '',
      longitudeErrorText: '',
      latitudeErrorText: '',
      categoryErrorText: '',
      snackBarOpen: false,
    });
  }

  onButtonClick = () => {
    const {
      onAdd,
      onEdit,
      onBack,
    } = this.props;

    const {
      id,
      name,
      address,
      longitude,
      latitude,
      category,
      editMode,
    } = this.state;

    let error = false;
    if (name === '') {
      this.setState({ nameErrorText: 'Name cannot be empty' });
      error = true;
    } else {
      this.setState({ nameErrorText: '' });
    }

    if (address === '') {
      this.setState({ addressErrorText: 'Address cannot be empty' });
      error = true;
    } else {
      this.setState({ addressErrorText: '' });
    }

    if (longitude === '') {
      this.setState({ longitudeErrorText: 'Longitude cannot be empty' });
      error = true;
    } else if (isNaN(longitude)) {
      this.setState({ longitudeErrorText: 'Please enter valid longitude' });
      error = true;
    } else {
      this.setState({ longitudeErrorText: '' });
    }

    if (latitude === '') {
      this.setState({ latitudeErrorText: 'Latitude cannot be empty' });
      error = true;
    } else if (isNaN(longitude)) {
      this.setState({ longitudeErrorText: 'Please enter valid latitude' });
      error = true;
    } else {
      this.setState({ latitudeErrorText: '' });
    }

    if (category === '') {
      this.setState({ categoryErrorText: 'Category cannot be empty' });
      error = true;
    } else {
      this.setState({ categoryErrorText: '' });
    }

    if (error) return;

    if (editMode) {
      onEdit({
        id,
        name,
        address,
        longitude,
        latitude,
        category,
      });
    } else {
      onAdd({
        id: uuid.v4(),
        name,
        address,
        longitude,
        latitude,
        category,
      });
    }
    this.setState({ snackBarOpen: true });

    this.isOpen = false;
    onBack();
  }

  // local variable to track if the dialog opened or not
  isOpen = false;

  handleNameChange = event => this.setState({ name: event.target.value, nameErrorText: '' });
  handleAddressChange = event => this.setState({ address: event.target.value, addressErrorText: '' });
  handleLongitudeChange = event => this.setState({ longitude: event.target.value, longitudeErrorText: '' });
  handleLatitudeChange = event => this.setState({ latitude: event.target.value, latitudeErrorText: '' });
  handleCategoryChange = (event, index, value) => this.setState({ category: value, categoryErrorText: '' });
  handleSnackBarRequestClose = () => this.setState({ snackBarOpen: false });

  render() {
    const {
      open,
      onBack,
      categories,
    } = this.props;

    const {
      editMode,
      name,
      address,
      longitude,
      latitude,
      category,
      snackBarOpen,
      nameErrorText,
      addressErrorText,
      longitudeErrorText,
      latitudeErrorText,
      categoryErrorText,
    } = this.state;

    return (
      <div>
        <Drawer
          open={open}
          width={window.innerWidth * 0.2}
          containerStyle={styles.drawer}
        >
          <div style={styles.container}>
            <IconButton
              style={styles.backButton}
              onTouchTap={() => {
                this.isOpen = false;
                onBack();
              }}
            >
              <ArrowBackIcon color="white" />
            </IconButton>

            <span style={styles.title}>{editMode ? 'Edit Location' : 'Add New Location'}</span>
          </div>

          <div style={styles.content}>
            <TextField
              style={styles.textField}
              hintText="Location Name"
              floatingLabelText="Location Name"
              errorText={nameErrorText}
              value={name}
              onChange={this.handleNameChange}
            />

            <TextField
              style={styles.textField}
              hintText="Location Address"
              floatingLabelText="Location Address"
              errorText={addressErrorText}
              value={address}
              onChange={this.handleAddressChange}
            />

            <SelectField
              style={styles.textField}
              floatingLabelText="Category"
              errorText={categoryErrorText}
              value={category}
              onChange={this.handleCategoryChange}
            >
              {categories.map(cat =>
                <MenuItem value={cat} primaryText={cat} key={cat} />)
              }
            </SelectField>

            <TextField
              style={styles.textField}
              hintText="Location Latitude"
              floatingLabelText="Location Latitude"
              errorText={latitudeErrorText}
              value={latitude}
              onChange={this.handleLatitudeChange}
            />

            <TextField
              style={styles.textField}
              hintText="Location Longitude"
              floatingLabelText="Location Longitude"
              errorText={longitudeErrorText}
              value={longitude}
              onChange={this.handleLongitudeChange}
            />

            <div style={styles.addButton}>
              <FloatingActionButton
                mini
                secondary
                onTouchTap={this.onButtonClick}
              >
                {editMode ? <EditIcon /> : <AddIcon />}
              </FloatingActionButton>
            </div>

            <div style={styles.useMapTitle}>Click on map to select coordinates from map</div>

          </div>
        </Drawer>

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

export default AddLocation;
