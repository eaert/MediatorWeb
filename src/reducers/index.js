import { combineReducers } from "redux";

import datesReducer from "./dates";
import selectorsReducer from "./selectors";

const allReducers = combineReducers({
    dates: datesReducer,
    selectors: selectorsReducer
})

export default allReducers