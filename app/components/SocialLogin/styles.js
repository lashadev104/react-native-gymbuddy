import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    socialView: {
        width: window.width * 0.8,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    socilIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})