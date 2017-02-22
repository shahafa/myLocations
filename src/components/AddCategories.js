import React, { Component, PropTypes } from 'react';
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

class AddCategories extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    category: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      categoryValue: props.category !== '' ? props.category : '',
      errorText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryValue: nextProps.category !== '' ? nextProps.category : '',
      errorText: '',
    });
  }

  onConfirmButtonClick = (oldCategoryValue, newCategoryValue) => {
    const { onConfirm, categories } = this.props;

    if (newCategoryValue === '') {
      this.setState({
        errorText: 'Category cannot be empty',
      });
      return;
    }

    if (categories.includes(newCategoryValue)) {
      this.setState({
        errorText: 'Category allready exists',
      });
      return;
    }

    onConfirm(oldCategoryValue, newCategoryValue);
  };

  handleCategoryValueChange = (event) => {
    this.setState({
      categoryValue: event.target.value,
    });
  };

  render() {
    const {
      open,
      category,
      onClose,
    } = this.props;

    const {
      categoryValue,
      errorText,
    } = this.state;

    return (
      <Dialog
        contentStyle={styles.dialog}
        modal
        title={category !== '' ? 'Edit Category' : 'Add Category'}
        open={open}
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={onClose}
          />,
          <FlatButton
            label={category !== '' ? 'Rename' : 'Add'}
            primary
            onTouchTap={() => this.onConfirmButtonClick(category, categoryValue)}
          />,
        ]}
      >
        {category !== '' ? `Type new name for category '${category}'` : 'Type new category name'}
        <br />
        <TextField
          style={styles.textField}
          hintText="Category Name"
          value={categoryValue}
          onChange={this.handleCategoryValueChange}
          errorText={errorText}
          autoFocus
        />
      </Dialog>
    );
  }
}

export default AddCategories;
