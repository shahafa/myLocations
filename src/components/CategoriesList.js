import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import AddIcon from 'material-ui/svg-icons/content/add';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
import { lightBlueA200 } from 'material-ui/styles/colors';
import OptionsButton from './general/OptionsButton';
import AddCategories from './AddCategories';
import ConfirmDialog from './general/ConfirmDialog';

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: lightBlueA200,
    height: '57px',
    justifyContent: 'space-between',
    paddingLeft: '12px',
    paddingRight: '4px',
  },

  buttons: {
    marginTop: '5px',
  },

  title: {
    color: 'white',
    marginTop: '20px',
    marginLeft: '5px',
  },

  noCategoriesFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '50px',
  },

  noCategoriesFoundIcon: {
    color: 'rgba(0, 0, 0, 0.298039)',
    width: '64px',
    height: '64px',
  },

  noCategoriesFoundTitle: {
    marginTop: '25px',
    color: 'rgba(0, 0, 0, 0.298039)',
  },
};

class CategoriesList extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    renameCategory: PropTypes.func.isRequired,
  }

  state = {
    categoriesDialogOpen: false,
    confirmDeleteDialogOpen: false,
  };

  onCategoriesClick = (category) => {
    this.setState({
      categoriesDialogOpen: true,
      categoriesDialogCategory: category,
    });
  }

  onCategoriesDialogConfirm = (oldCategoryValue, newCategoryValue) => {
    const { addCategory, renameCategory } = this.props;

    if (oldCategoryValue !== '') {
      renameCategory(oldCategoryValue, newCategoryValue);
    } else {
      addCategory(newCategoryValue);
    }

    this.setState({ categoriesDialogOpen: false });
  }

  onCategoriesDialogClose = () => {
    this.setState({ categoriesDialogOpen: false });
  }

  onDeleteCategoryClick = (category) => {
    this.setState({
      confirmDeleteDialogOpen: true,
      confirmDeleteDialogObject: category,
      confirmDeleteDialogMessage: `Are you sure you want to delete category '${category}' ?`,
    });
  }

  onDeleteDialogConfirm = (category) => {
    const { deleteCategory } = this.props;
    deleteCategory(category);

    this.setState({ confirmDeleteDialogOpen: false });
  }

  onDeleteDialogClose = () => {
    this.setState({ confirmDeleteDialogOpen: false });
  }

  render() {
    const {
      categories,
    } = this.props;

    const {
      categoriesDialogOpen,
      categoriesDialogCategory,
      confirmDeleteDialogOpen,
      confirmDeleteDialogMessage,
      confirmDeleteDialogObject,
    } = this.state;

    return (
      <div>
        <Card>
          <div style={styles.toolbar}>
            <IconButton
              style={styles.buttons}
              onTouchTap={() => this.onCategoriesClick('')}
              tooltip="Add New Category"
            >
              <AddIcon color="white" />
            </IconButton>

            <div style={styles.title}>Categories</div>
          </div>

          {categories.length === 0 &&
            <div style={styles.noCategoriesFound}>
              <LocalOfferIcon style={styles.noCategoriesFoundIcon} />
              <div style={styles.noCategoriesFoundTitle}>No categories, use the add button to add new category</div>
            </div>
          }

          <List>
            {categories.sort().map(category =>
              <ListItem
                key={category}
                primaryText={category}
                disabled
                rightIconButton={
                  <IconMenu iconButtonElement={OptionsButton}>
                    <MenuItem
                      onTouchTap={() => this.onCategoriesClick(category)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onTouchTap={() => this.onDeleteCategoryClick(category)}
                    >
                      Delete
                    </MenuItem>
                  </IconMenu>
                }
              />)
            }
          </List>
        </Card>

        <AddCategories
          open={categoriesDialogOpen}
          categories={categories}
          category={categoriesDialogCategory}
          onConfirm={this.onCategoriesDialogConfirm}
          onClose={this.onCategoriesDialogClose}
        />

        <ConfirmDialog
          open={confirmDeleteDialogOpen}
          message={confirmDeleteDialogMessage}
          object={confirmDeleteDialogObject}
          ConfirmButtonText="Delete"
          onConfirm={this.onDeleteDialogConfirm}
          onClose={this.onDeleteDialogClose}
        />
      </div>
    );
  }
}

export default CategoriesList;
