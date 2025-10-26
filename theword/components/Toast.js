import { ToastAndroid, Platform } from "react-native";

export const Toast = ({ visible, message }) => {
    if (visible) {
        if(Platform.OS == "android")
        {
            ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            return null;
        }
    }
    return null;
}