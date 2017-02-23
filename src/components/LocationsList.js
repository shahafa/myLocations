import React, { PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { List } from 'material-ui/List';
import AddIcon from 'material-ui/svg-icons/content/add';
import ReorderIcon from 'material-ui/svg-icons/action/reorder';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import { lightBlueA200 } from 'material-ui/styles/colors';
import LocationItem from './LocationItem';

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

const LocationsList = ({
  groupBy,
  locations,
  categories,
  onGroupByClick,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onSelect,
}) => (
  <div>
    <div style={styles.toolbar}>
      <IconButton
        style={styles.buttons}
        onTouchTap={onGroupByClick}
        tooltip={groupBy ? 'Ungroup' : 'Group by Category'}
      >
        <ReorderIcon color="white" />
      </IconButton>

      <IconButton
        style={styles.buttons}
        onTouchTap={onAddClick}
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

    {locations.length !== 0 &&
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
                              onSelect={onSelect}
                              onEditClick={onEditClick}
                              onDeleteClick={onDeleteClick}
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
                onSelect={onSelect}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />)
          }
        </List>
      </div>
    }
  </div>
);

LocationsList.propTypes = {
  groupBy: PropTypes.bool.isRequired,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onGroupByClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired, // selectLocation
};

export default LocationsList;
