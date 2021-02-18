import { ToastAndroid } from "react-native";

export const Toast = ({ visible, message }) => {
    if (visible) {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        return null;
    }
    return null;
}