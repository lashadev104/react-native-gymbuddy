import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    content: {
        width: window.width * 0.8,
        marginTop: 40,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    avatarOverlayView: {
        backgroundColor: '#50555a', 
        borderWidth: 3, 
        borderColor: '#20d471',
    },
    avatarView: {
        backgroundColor: '#50555a', 
        borderWidth: 2, 
        borderColor: '#20d471',
    },
    formElement: {
        width: '100%',
        borderBottomColor: '#494d52',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 12,
        color: '#9a9c9f',
        marginBottom: 5,
    },
    fieldText: {
        color: 'white'
    },
    checkbox: {
        margin: 0, 
        padding: 0, 
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0
    },
    worktime: {
        color: 'white',
        fontSize: 14
    }
})