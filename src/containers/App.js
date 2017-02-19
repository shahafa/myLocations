import React, { PropTypes } from 'react';
import DevTools from './DevTools';
import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },

  content: {
    flex: '1',
  },
};

const developmentMode = process.env.NODE_ENV === 'development';

const App = ({ children }) => (
  <div style={styles.container}>
    <Header />

    <div style={styles.content}>
      {children}
    </div>

    <Footer />

    {developmentMode &&
      <DevTools />
    }
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
