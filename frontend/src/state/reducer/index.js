import { combineReducers} from "redux";
import session from "./session";
import todos from "./todos";

const reducers = combineReducers({
    session,
    todos
})

export default reducers;