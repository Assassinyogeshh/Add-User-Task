import { configureStore } from "@reduxjs/toolkit";
import userTaskSlice from "../Slices/userTask";

const store= configureStore({
    reducer:{
        userTask:userTaskSlice.reducer,
    }
})

export default store;