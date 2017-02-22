export const addCategory = category => ({
  type: 'ADD_CATEGORY',
  category,
});

export const deleteCategory = category => ({
  type: 'DELETE_CATEGORY',
  category,
});

export const renameCategory = (oldCategoryValue, newCategoryValue) => ({
  type: 'RENAME_CATEGORY',
  oldCategoryValue,
  newCategoryValue,
});
