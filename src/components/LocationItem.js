import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import OptionsButton from './general/OptionsButton';

const LocationItem = ({
  location,
  onSelect,
  showCategory,
  onEditClick,
  onDeleteClick,
}) => (
  <ListItem
    value={location.id}
    key={location.id}
    primaryText={location.name}
    secondaryText={
      <div>
        {showCategory && <div>{location.category}</div>}
        <div>{location.address}</div>
      </div>
    }
    secondaryTextLines={showCategory ? 2 : 1}
    onTouchTap={() => onSelect(location)}
    rightIconButton={
      <IconMenu iconButtonElement={OptionsButton}>
        <MenuItem onTouchTap={() => onEditClick(location)}>
          Edit
        </MenuItem>
        <MenuItem onTouchTap={() => onDeleteClick(location)}>
          Delete
        </MenuItem>
      </IconMenu>
    }
  />
);

LocationItem.propTypes = {
  showCategory: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default LocationItem;
