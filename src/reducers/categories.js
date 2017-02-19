const initialState = {
  categories: [],
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return Object.assign({}, state, {
        getFiltersInit: true,
      });
    default:
      return state;
  }
};

export default filter;
