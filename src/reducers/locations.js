const initialState = {
  locations: [],
  selectedLocation: null,
  selectedCoordinates: {
    latitude: '',
    longitude: '',
  },
};

function compareLocationsByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_LOCATION':
      return {
        ...state,
        selectedLocation: action.selectedLocation,
      };
    case 'CLEAR_SELECTED_LOCATION':
      return {
        ...state,
        selectedLocation: null,
      };
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.location].sort(compareLocationsByName),
      };
    case 'DELETE_LOCATION':
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.locationId)
                                  .sort(compareLocationsByName),
      };
    case 'EDIT_LOCATION':
      return {
        ...state,
        locations: state.locations.map(location => (
          location.id === action.location.id ? action.location : location
        )).sort(compareLocationsByName),
      };
    case 'SELECT_COORDINATES':
      return {
        ...state,
        selectedCoordinates: {
          latitude: action.latitude,
          longitude: action.longitude,
        },
      };
    case 'CLEAR_SELECTED_COORDINATES':
      return {
        ...state,
        selectedCoordinates: {
          latitude: '',
          longitude: '',
        },
      };
    default:
      return state;
  }
};

export default filter;
