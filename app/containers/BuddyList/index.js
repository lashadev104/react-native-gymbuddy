import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from './../../components/Header';
import Buddy from './../../components/Buddy';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles';

import { buddies } from './../../constants/buddies.js';

class BuddyList extends Component {

    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <Header back={true} notification={false} title="Buddies"/>
                    <View style={commonStyle.content1}>
                        <ScrollView style={styles.buddylist} showsVerticalScrollIndicator={false}>
                        {
                            buddies.map((buddy, index) => {
                                return (
                                    <Buddy key={index} user={buddy} />
                                );
                            })
                        }
                        </ScrollView>
                    </View>
                </View>
            </Image>
        );
    }
}

export default BuddyList;