import { StyleSheet, Dimensions } from 'react-native';

let window = Dimensions.get("window");

export default StyleSheet.create({
    user: {
        width: '95%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#494d52',
        height: 90
    },
    avatarView: {
        backgroundColor: '#50555a', 
        borderWidth: 2, 
        borderColor: '#20d471',
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        color: 'white',
    },
    city: {
        fontSize: 16,
        color: '#adaeb0'
    },
    info: {
        fontSize: 16,
        color: '#20d471',
        marginTop: 5
    }
})