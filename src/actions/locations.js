export const selectLocation = location => ({
  type: 'SELECT_LOCATION',
  selectedLocation: location,
});

export const clearSelectedLocation = () => ({
  type: 'CLEAR_SELECTED_LOCATION',
});

export const addLocation = location => ({
  type: 'ADD_LOCATION',
  location,
});

export const deleteLocation = locationId => ({
  type: 'DELETE_LOCATION',
  locationId,
});

export const editLocation = location => ({
  type: 'EDIT_LOCATION',
  location,
});

export const selectCoordinates = (latitude, longitude) => ({
  type: 'SELECT_COORDINATES',
  latitude,
  longitude,
});

export const clearSelectedCoordinates = () => ({
  type: 'CLEAR_SELECTED_COORDINATES',
});
