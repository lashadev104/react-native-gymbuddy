import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

import MenuItem from './MenuItem';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles.js';

class SideBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.sidemenu}>
                <View style={{flexDirection: 'row', padding: 20}}>
                    <Avatar large rounded 
                        source={images.profile_photo} avatarStyle={styles.avatarView} />
                    <View style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
                        <Text style={styles.name}>Hugh Jackman</Text>
                        <Text style={styles.interests}>Crossfit, Running</Text>
                    </View>
                </View>
                <View>
                    <MenuItem scene="profile" name="Profile" icon="pencil" type="simple-line-icon" />
                    <MenuItem scene="settings" name="Settings" icon="settings" type="simple-line-icon" />
                    <MenuItem scene="buddy" name="Buddies" icon="person-outline" type="material" />
                    <MenuItem scene="groups" name="Groups" icon="people-outline" type="material" />
                    <MenuItem scene="about" name="About" icon="info" type="simple-line-icon" />
                    <MenuItem scene="login" name="Log out" icon="logout" type="simple-line-icon" />
                </View>
            </View>
        );
    }
}

export default SideBar;