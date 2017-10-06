import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})