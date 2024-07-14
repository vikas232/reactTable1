import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import  thunkMiddleware  from "redux-thunk";
import rootReducer from "./rootReducer";
const store = configureStore({
        reducer: rootReducer,
    }
);

export default store;