const initialState = {
  count: 0,
  isLoading: false,
  listItem: [],
  totalPrice: 0,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
   case "ADD_ITEM_TO_CART": 
    return {
      ...state,
      count: action.count
    }
    break;
    case "SET_LOADING": 
    return {
      ...state,
      isLoading: action.isLoading
    }
    break;
    case "ADD_ITEM_TO_LIST": 
    return {
      ...state,
      listItem: [...state.listItem, action.listCard],
    }
    break;
    case "TOTAL_PRICE": 
    return {
      ...state,
      totalPrice: state.totalPrice + action.price
    }
    break;
    default:
      return state;
  }
};