import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        notification: (state, action) => {
            return action.payload; // Use action.payload instead of action.message
        },
        clearNotification: () => null
    }
});

export const { notification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, timeout) => {
    // console.log("redux", message);
    return (dispatch) => {
        dispatch(notification(message)); // Use notification instead of Notification
        setTimeout(() => {
            dispatch(clearNotification());
        }, timeout);
    };
};

export default notificationSlice.reducer;
