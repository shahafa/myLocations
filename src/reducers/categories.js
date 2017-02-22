const initialState = {
  categories: [],
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.category],
      };
    case 'DELETE_CATEGORY': {
      const categoryIndex = state.categories.indexOf(action.category);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIndex),
          ...state.categories.slice(categoryIndex + 1),
        ],
      };
    }
    case 'RENAME_CATEGORY': {
      const categoryIndex = state.categories.indexOf(action.oldCategoryValue);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIndex),
          action.newCategoryValue,
          ...state.categories.slice(categoryIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};

export default filter;
