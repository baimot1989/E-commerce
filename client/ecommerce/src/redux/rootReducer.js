const initialState = {
    user: {},
  };
  
  // state - current state
  // action - { type: "WHAT_TO_DO", [payload: value] }
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN': {
        console.log(action)
        return { ...state, user: action.payload };
      }
      case 'LOGOUT': {
        console.log(action)
        return { ...state, user: action.payload };
      }
      
      default:
        return state;
    }
  };
  
  export default appReducer;
  