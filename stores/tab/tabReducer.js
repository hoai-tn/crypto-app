import * as TabActions from "./tabActions";
const initialState = {
  isTradeModalVisible: false,
};
const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case TabActions.SET_TRADE_MODAL_VISIBILITY:
      console.log(action.payload);
      return {
        ...state,
        isTradeModalVisible: action.payload,
      };
    default:
      return state;
  }
};
export default tabReducer;
