import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Footer from '../components/Footer';

const CATEGORIES_INDEX = 0;
const LOCATIONS_INDEX = 1;

class FooterContainer extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.path === '/locations' ? LOCATIONS_INDEX : CATEGORIES_INDEX,
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

const mapStateToProps = state => ({
  path: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(FooterContainer);
