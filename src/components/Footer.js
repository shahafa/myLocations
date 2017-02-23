import React, { PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';

const styles = {
  footer: {
    zIndex: 999,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  },
};

const Footer = ({
  selectedIndex,
  onCategoriesClick,
  onLocationsClick,
}) => (
  <Paper zDepth={1}>
    <BottomNavigation selectedIndex={selectedIndex} style={styles.footer}>
      <BottomNavigationItem
        label="Categories"
        icon={<LocalOfferIcon />}
        onTouchTap={onCategoriesClick}
      />
      <BottomNavigationItem
        label="Locations"
        icon={<LocationIcon />}
        onTouchTap={onLocationsClick}
      />
    </BottomNavigation>
  </Paper>
);

Footer.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  onCategoriesClick: PropTypes.func.isRequired,
  onLocationsClick: PropTypes.func.isRequired,
};

export default Footer;
