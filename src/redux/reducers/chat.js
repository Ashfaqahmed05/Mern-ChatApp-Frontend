import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   NotificationCount : 0,

}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        increamentNotification: (state) => {
            state.NotificationCount += 1;
        },
        resetNotificationCount: (state) => {
            state.NotificationCount = 0;
        },
    },
});

export default chatSlice;
export const {
    increamentNotification,
    resetNotificationCount
} = chatSlice.actions;