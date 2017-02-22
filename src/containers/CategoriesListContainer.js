import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCategory, deleteCategory, renameCategory } from '../actions/categories';
import CategoriesList from '../components/CategoriesList';

const CategoriesListContainer = ({
  addCategory,
  deleteCategory,
  renameCategory,
  categories,
}) => (
  <CategoriesList
    addCategory={addCategory}
    deleteCategory={deleteCategory}
    renameCategory={renameCategory}
    categories={categories}
  />
);

CategoriesListContainer.propTypes = {
  addCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  renameCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

const mapDispatchToProps = {
  addCategory,
  deleteCategory,
  renameCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListContainer);
