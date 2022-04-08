import { combineReducers } from "redux";

import datesReducer from "./dates";
import selectorsReducer from "./selectors";

const allReducers = combineReducers({
    dates: datesReducer,
    selector: selectorsReducer
})

export default allReducers