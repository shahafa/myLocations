import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';

const CATEGORIES_INDEX = 0;
const LOCATIONS_INDEX = 1;

class Footer extends Component {
  state = {
    selectedIndex: CATEGORIES_INDEX,
  };

  categoriesClick = () => {
    this.setState({ selectedIndex: CATEGORIES_INDEX });
    browserHistory.push('/categories');
  }

  locationsClick = () => {
    this.setState({ selectedIndex: LOCATIONS_INDEX });
    browserHistory.push('/locations');
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Categories"
            icon={<LocalOfferIcon />}
            onTouchTap={this.categoriesClick}
          />
          <BottomNavigationItem
            label="Locations"
            icon={<LocationIcon />}
            onTouchTap={this.locationsClick}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Footer;
