import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/categories';
import CategoriesList from '../components/CategoriesList';
import AddCategoryContainer from '../containers/AddCategoryContainer';
import ConfirmDialog from '../components/general/ConfirmDialog';

class CategoriesListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  }

  state = {
    addCategoryDialogOpen: false,
    confirmDeleteDialogOpen: false,
    editedCategory: '',
  }

  handleAddCategoryClick = (category) => {
    this.setState({
      addCategoryDialogOpen: true,
      editedCategory: category,
    });
  }

  handleAddCategoryDialogClose = () => {
    this.setState({ addCategoryDialogOpen: false });
  }

  handleDeleteCategoryClick = (category) => {
    this.setState({
      confirmDeleteDialogOpen: true,
      confirmDeleteDialogObject: category,
      confirmDeleteDialogMessage: `Are you sure you want to delete category '${category}' ?`,
    });
  }

  handleDeleteDialogConfirm = (category) => {
    const { dispatch } = this.props;
    dispatch(deleteCategory(category));

    this.setState({ confirmDeleteDialogOpen: false });
  }

  handleDeleteDialogClose = () => {
    this.setState({ confirmDeleteDialogOpen: false });
  }

  render() {
    const {
      categories,
    } = this.props;

    const {
      addCategoryDialogOpen,
      editedCategory,
      confirmDeleteDialogOpen,
      confirmDeleteDialogMessage,
      confirmDeleteDialogObject,
    } = this.state;

    return (
      <div>
        <CategoriesList
          categories={categories}
          onAddCategoryClick={this.handleAddCategoryClick}
          onDeleteCategoryClick={this.handleDeleteCategoryClick}
        />

        <AddCategoryContainer
          open={addCategoryDialogOpen}
          editedCategory={editedCategory}
          onClose={this.handleAddCategoryDialogClose}
        />

        <ConfirmDialog
          open={confirmDeleteDialogOpen}
          message={confirmDeleteDialogMessage}
          object={confirmDeleteDialogObject}
          ConfirmButtonText="Delete"
          onConfirm={this.handleDeleteDialogConfirm}
          onClose={this.handleDeleteDialogClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(CategoriesListContainer);
