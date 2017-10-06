import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

import styles from './styles.js';

class User extends Component {

    constructor(props) {
        super(props);
    }
    min2Time = (time) => {
        let h = parseInt(time/60);
        let m = time % 60;
        if (h === 0) return m + ' mins';
        if (h === 1 && m === 0) return h + ' hour'
        if (h === 2 && m === 0) return h + ' hours'
        return h + '.' + m + ' hours';
    }
    onPressUser = () => {
        let props = {
            username: this.props.user.name,
            avatar: this.props.user.photo,
        }
        console.log("before", props);
        Actions.chat(props);
    }
    render() {
        return (
            <TouchableHighlight onPress={this.onPressUser} underlayColor="#565b61">
                <View style={styles.user}>
                    <Avatar width={70} height={70} rounded 
                        source={this.props.user.photo} avatarStyle={styles.avatarView} 
                        overlayContainerStyle={{marginTop: 20, marginLeft: 10}}/>
                    <View style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 20, width: '75%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>{this.props.user.name + ", "}</Text>
                            <Text style={styles.city}>{this.props.user.city}</Text>
                        </View>
                        <Text style={styles.info} >{this.props.user.interests.join(", ") + " | " + this.min2Time(this.props.user.time)}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default User;