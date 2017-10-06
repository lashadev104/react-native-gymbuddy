import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Avatar, Badge } from 'react-native-elements';

import styles from './styles.js';

class Buddy extends Component {

    constructor(props) {
        super(props);
    }
    
    onPressUser = () => {
        
    }
    render() {
        return (
            <TouchableHighlight onPress={this.onPressUser} underlayColor="#565b61">
                <View style={styles.buddy}>
                    <View style={{flexDirection: 'row'}}>
                        <Avatar width={70} height={70} rounded 
                            source={this.props.user.photo} avatarStyle={styles.avatarView} 
                            overlayContainerStyle={{marginTop: 20}}/>
                        <View style={styles.buddyinfowithimage}>
                            <Text style={styles.name}>{this.props.user.name}</Text>
                            <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">{this.props.user.lastmessage}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', marginTop: 5}}>
                        <Text style={styles.time}>{this.props.user.time}</Text>
                        { this.props.user.unread !== 0 &&
                        <Badge value={this.props.user.unread} containerStyle={styles.badge} textStyle={{color: 'white', backgroundColor: 'rgba(0,0,0,0)'}} />
                        }
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Buddy;