import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    buddy: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: window.width * 0.025,
        paddingRight: window.width * 0.025,
        borderBottomWidth: 1,
        borderBottomColor: '#494d52',
        height: 90
    },
    avatarView: {
        backgroundColor: '#50555a', 
        borderWidth: 2, 
        borderColor: '#20d471',
    },
    buddyinfowithimage: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginLeft: 10, 
        width: window.width * 0.4
    },
    name: {
        fontSize: 18,
        color: 'white',
    },
    message: {
        fontSize: 15,
        color: '#adaeb0'
    },
    time: {
        fontSize: 15,
        color: '#20d471',
        marginTop: 5
    },
    badge: {
        backgroundColor: '#ff9b4a',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        alignSelf: 'flex-end',
        marginTop: 10,
    }
})