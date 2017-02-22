import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';

const CATEGORIES_INDEX = 0;
const LOCATIONS_INDEX = 1;

const styles = {
  footer: {
    zIndex: 999,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  },
};

class Footer extends Component {
  static propTypes = {
    page: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.page.type.name === 'LocationsPage' ? LOCATIONS_INDEX : CATEGORIES_INDEX,
    };
  }

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
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={styles.footer}>
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
