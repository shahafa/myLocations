import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import AddIcon from 'material-ui/svg-icons/content/add';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
import { lightBlueA200 } from 'material-ui/styles/colors';
import OptionsButton from './general/OptionsButton';

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
    paddingBottom: '75px',
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

const CategoriesList = ({
  categories,
  onAddCategoryClick,
  onDeleteCategoryClick,
}) => (
  <Card>
    <div style={styles.toolbar}>
      <IconButton
        style={styles.buttons}
        onTouchTap={() => onAddCategoryClick('')}
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

    {categories.length !== 0 &&
      <List>
        {categories.sort().map(category =>
          <ListItem
            key={category}
            primaryText={category}
            disabled
            rightIconButton={
              <IconMenu iconButtonElement={OptionsButton}>
                <MenuItem
                  onTouchTap={() => onAddCategoryClick(category)}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onTouchTap={() => onDeleteCategoryClick(category)}
                >
                  Delete
                </MenuItem>
              </IconMenu>
            }
          />)
        }
      </List>
    }
  </Card>
);

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  onAddCategoryClick: PropTypes.func.isRequired,
  onDeleteCategoryClick: PropTypes.func.isRequired,
};

export default CategoriesList;
