export const initialState = {
  geoData: {},
  history: [],
  error: null,
};

export const geoReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_GEO_SUCCESS':
      return { ...state, geoData: action.payload, error: null };
    case 'FETCH_GEO_FAILED':
      return { ...state, error: action.payload };
    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
    case 'DELETE_HISTORY':
      return { ...state, history: state.history.filter((item) => !action.payload.includes(item)) };

    default:
      return state;
  }
};
