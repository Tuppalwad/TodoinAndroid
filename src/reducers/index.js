import { combineReducers } from "redux";
import authReducers from "./authReducers";
import todoReducers from "./todoReducers";

const appReducer = combineReducers({
    auth: authReducers,
    todo:todoReducers
})

export default  appReducer;