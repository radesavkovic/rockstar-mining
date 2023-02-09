import { configureStore } from '@reduxjs/toolkit'
// import web3Reducer from "./web3Slice";
import dataReducer from "./dataSlice";


export const web3Store = configureStore({
    reducer: {
        // web3Reducer: web3Reducer,
        dataReducer: dataReducer,
    },
})