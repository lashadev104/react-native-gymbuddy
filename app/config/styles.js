//Global styles.

import { StyleSheet, Dimensions, Platform } from 'react-native';

let window = Dimensions.get("window");

export default commonStyle = {
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(48,54,60, 1)',
        opacity: 0.96,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        height: window.height - 20,        
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content1: {
        flex: 1,
        height: window.height - 70,
        width: window.width,
    },
    footer: {
        height: 20,
        alignItems: 'center'
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    },
    logoImage: {
        width: window.width * 0.3,
        height: window.width * 0.31
    },
    logoTextImage: {
        width: window.width * 0.4,
        height: 20
    },
    inputView: {
        backgroundColor: '#494d52',
        width: window.width * 0.8,
        borderRadius: 50,
        padding: 12,
        paddingLeft: 15,
        margin: 5,
    },
    buttonView: {
        backgroundColor: '#20d471',
        width: window.width * 0.8,
        borderRadius: 50,
        padding: 12,
        margin: 5,
        alignItems: 'center',
        opacity: 1
    },
    textInput: {
        fontSize: 13,
        color: 'white',
        paddingLeft: 10
    },
    buttonText: {
        fontSize: 17,
        color: 'white'
    }
};