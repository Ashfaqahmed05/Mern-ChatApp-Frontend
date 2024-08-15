import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewGroup: false,
    isAddMember: false,
    isNotification: false,
    isMobile: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteFile: false,
    uploadingLoader: false,
    selectedDeleteChat: {
        chatId: "",
        groupChat: false,
    }

}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setDeleteFile: (state, action) => {
            state.isDeleteFile = action.payload;
        },
        setUploadLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        },
    },
});

export default miscSlice;
export const {
    setNewGroup,
    setAddMember,
    setIsNotification,
    setIsMobile,
    setIsSearch,
    setIsFileMenu,
    setDeleteFile,
    setUploadLoader,
    setSelectedDeleteChat
} = miscSlice.actions;