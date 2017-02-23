import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  dialog: {
    maxWidth: '500px',
  },

  textField: {
    width: '100%',
  },
};

const AddCategory = ({
  open,
  categoryValue,
  handleCategoryValueChange,
  errorText,
  editedCategory,
  onClose,
  onConfirm,
}) => (
  <Dialog
    contentStyle={styles.dialog}
    modal
    title={editedCategory !== '' ? 'Edit Category' : 'Add Category'}
    open={open}
    actions={[
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={onClose}
      />,
      <FlatButton
        label={editedCategory !== '' ? 'Rename' : 'Add'}
        primary
        onTouchTap={() => onConfirm(editedCategory, categoryValue)}
      />,
    ]}
  >
    {editedCategory !== '' ? `Type new name for category '${editedCategory}'` : 'Type new category name'}
    <br />
    <TextField
      style={styles.textField}
      hintText="Category Name"
      value={categoryValue}
      onChange={handleCategoryValueChange}
      errorText={errorText}
      autoFocus
    />
  </Dialog>
);

AddCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  categoryValue: PropTypes.string.isRequired,
  handleCategoryValueChange: PropTypes.func.isRequired,
  errorText: PropTypes.string.isRequired,
  editedCategory: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddCategory;
