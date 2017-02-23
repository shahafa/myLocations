import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Footer from '../components/Footer';

const CATEGORIES_INDEX = 0;
const LOCATIONS_INDEX = 1;

class FooterContainer extends Component {
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
    const {
      selectedIndex,
    } = this.state;

    return (
      <Footer
        selectedIndex={selectedIndex}
        onCategoriesClick={this.categoriesClick}
        onLocationsClick={this.locationsClick}
      />
    );
  }
}

export default FooterContainer;
