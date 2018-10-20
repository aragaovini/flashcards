import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root";
import thunk from "redux-thunk";

const storeConfig = createStore(rootReducer, applyMiddleware(thunk));

export default storeConfig;
