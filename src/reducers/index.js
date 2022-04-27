import { combineReducers } from "redux";

import datesReducer from "./dates";
import selectorsReducer from "./selectors";
import userReducer from "./user";

const allReducers = combineReducers({
    participant: userReducer,
    dates: datesReducer,
    selectors: selectorsReducer
})

export default allReducers