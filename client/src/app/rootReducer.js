import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";

const rootReducer = combineReducers({
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,  
});

export default rootReducer;