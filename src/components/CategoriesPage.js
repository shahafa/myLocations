import React from 'react';
import CategoriesListContainer from '../containers/CategoriesListContainer';

const styles = {
  container: {
    overflowY: 'auto',
  },

  page: {
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '35px',
  },
};

const CategoriesPage = () => (
  <div style={styles.container}>
    <div style={styles.page} className="contentHeight">
      <CategoriesListContainer />
    </div>
  </div>
);

export default CategoriesPage;
