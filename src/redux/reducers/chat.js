import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLoclStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
   NotificationCount : 0,
   newMessagesAlert : getOrSaveFromLoclStorage({
    key: NEW_MESSAGE_ALERT, get: true
   }) || [
    {
        chatId: "",
        count: 0,
    }
   ]

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
        setNewMessagesAlert: (state, action) => {
            const chatId = action.payload.chatId
            const index = state.newMessagesAlert.findIndex(
                (item) => item.chatId === chatId
            )

            if (index !== -1) {
                state.newMessagesAlert[index].count += 1;
            } else {
                state.newMessagesAlert.push({
                    chatId: chatId,
                    count: 1,
                })
            }
        },
        removeNewMessagesAlert: (state, action) => {
            state.newMessagesAlert = state.newMessagesAlert.filter(
                (item) => item.chatId !== action.payload
            )
        }
    },
});

export default chatSlice;
export const {
    increamentNotification,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert
} = chatSlice.actions;