import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    lineWithText: {
        width: window.width * 0.8,
    }  
})