import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    sidemenu: {
        backgroundColor: '#484c51',
        height: window.height,
        paddingTop: 40,
        borderRightWidth: 4,
        borderRightColor: '#20d471'
    },
    avatarView: {
        backgroundColor: '#50555a', 
        borderWidth: 2, 
        borderColor: '#20d471',
    },
    name: {
        fontSize: 20,
        color: 'white',
    },
    interests: {
        fontSize: 15,
        color: '#adaeb0'
    },
    menuitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 30
    },
    menuTextWithIcon: {
        flexDirection: 'row'
    },
    checkbox: {
        margin: 0, 
        padding: 0, 
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0
    }
})