import React, { PropTypes } from 'react';
import DevTools from './DevTools';
import Header from '../components/Header';
import FooterContainer from './FooterContainer';

const developmentMode = process.env.NODE_ENV === 'development';

const App = ({ children }) => (
  <div>
    <header className="header">
      <Header />
    </header>

    <main className="contentHeight">
      {children}
    </main>

    <footer className="footer">
      <FooterContainer />
    </footer>

    {developmentMode &&
      <DevTools />
    }
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
