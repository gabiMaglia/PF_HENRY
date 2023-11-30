const initialState = {
  myFavorites: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
