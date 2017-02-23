import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
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

const AddLocation = ({
  open,
  onBack,
  onAdd,
  editMode,
  location,
  onNameValueChange,
  onAddressValueChange,
  onCategoryValueChange,
  onLatitudeValueChange,
  onLongitudeValueChange,
  errors,
  categories,
}) => (
  <div>
    <Drawer
      open={open}
      width={window.innerWidth * 0.2}
      containerStyle={styles.drawer}
    >
      <div style={styles.container}>
        <IconButton
          style={styles.backButton}
          onTouchTap={onBack}
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
          errorText={errors.name}
          value={location.name}
          onChange={onNameValueChange}
        />

        <TextField
          style={styles.textField}
          hintText="Location Address"
          floatingLabelText="Location Address"
          errorText={errors.address}
          value={location.address}
          onChange={onAddressValueChange}
        />

        <SelectField
          style={styles.textField}
          floatingLabelText="Category"
          errorText={errors.category}
          value={location.category}
          onChange={onCategoryValueChange}
        >
          {categories.map(cat =>
            <MenuItem value={cat} primaryText={cat} key={cat} />)
          }
        </SelectField>

        <TextField
          style={styles.textField}
          hintText="Location Latitude"
          floatingLabelText="Location Latitude"
          errorText={errors.latitude}
          value={location.latitude}
          onChange={onLatitudeValueChange}
        />

        <TextField
          style={styles.textField}
          hintText="Location Longitude"
          floatingLabelText="Location Longitude"
          errorText={errors.longitude}
          value={location.longitude}
          onChange={onLongitudeValueChange}
        />

        <div style={styles.addButton}>
          <FloatingActionButton
            mini
            secondary
            onTouchTap={onAdd}
          >
            {editMode ? <EditIcon /> : <AddIcon />}
          </FloatingActionButton>
        </div>

        <div style={styles.useMapTitle}>Click on map to select coordinates from map</div>

      </div>
    </Drawer>
  </div>
);

AddLocation.propTypes = {
  open: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  location: PropTypes.object.isRequired,
  onNameValueChange: PropTypes.func.isRequired,
  onAddressValueChange: PropTypes.func.isRequired,
  onCategoryValueChange: PropTypes.func.isRequired,
  onLatitudeValueChange: PropTypes.func.isRequired,
  onLongitudeValueChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddLocation;
