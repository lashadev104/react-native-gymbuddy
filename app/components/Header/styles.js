import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    header: {
        height: 70,
        width: window.width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#8b8d91'
    },
    content: {
        width: window.width * 0.95,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    badge: {
        height: 20,
        backgroundColor: '#ff9b4a',
        padding: 3, 
        position: 'relative', 
        marginTop: -32, 
        marginLeft: 20
    }
})