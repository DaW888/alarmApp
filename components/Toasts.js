import {ToastAndroid} from "react-native";

class Toasts {
    static short = (text) => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            50
        );
    }

    static long = (text) => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50
        );
    }
}

export default Toasts;
