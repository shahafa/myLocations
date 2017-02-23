import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCategory, renameCategory } from '../actions/categories';
import AddCategory from '../components/AddCategory';

class AddCategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    editedCategory: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    editedCategory: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      categoryValue: props.editedCategory,
      errorText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryValue: nextProps.editedCategory,
      errorText: '',
    });
  }

  handleCategoryValueChange = (event) => {
    this.setState({
      categoryValue: event.target.value,
    });
  };

  handleConfirmButtonClick = (oldCategoryValue, newCategoryValue) => {
    const { dispatch, onClose, categories } = this.props;

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

    if (oldCategoryValue !== '') {
      dispatch(renameCategory(oldCategoryValue, newCategoryValue));
    } else {
      dispatch(addCategory(newCategoryValue));
    }

    onClose();
  };

  render() {
    const {
      open,
      editedCategory,
      onClose,
    } = this.props;

    const {
      categoryValue,
      errorText,
    } = this.state;

    return (
      <AddCategory
        open={open}
        editedCategory={editedCategory}
        onClose={onClose}
        onConfirm={this.handleConfirmButtonClick}
        handleCategoryValueChange={this.handleCategoryValueChange}
        categoryValue={categoryValue}
        errorText={errorText}
      />
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(AddCategoryContainer);
