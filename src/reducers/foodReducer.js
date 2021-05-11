const initialState = {
  isLoading: false,
  listItem: [],
};

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING": 
    return {
      ...state,
      isLoading: action.isLoading
    }
    break;
    case "ADD_ITEM_TO_HANDLE": 
    const listItemsAdd = [...state.listItem, action.item]
    return {
      ...state,
      listItem: listItemsAdd,
    }
    break;
    case "REMOVE_ITEM_TO_HANDLE": 
    const listItemsRemove = state.listItem.filter(item => item !== action.item)
    return {
      ...state,
      listItem: listItemsRemove,
    }
    break;
    default:
      return state;
  }
};