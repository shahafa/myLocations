import React from 'react';
import AppBar from 'material-ui/AppBar';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  appBar: {
    backgroundColor: cyan500,
  },

  title: {
    fontWeight: '300',
  },
};

const Header = () => (
  <AppBar
    title="myLocations"
    showMenuIconButton={false}
    style={styles.appBar}
    titleStyle={styles.title}
  />
);

export default Header;
