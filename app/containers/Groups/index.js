import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from './../../components/Header';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles';

class Groups extends Component {

    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <Header back={true} notification={false} title="Groups"/>
                    <View style={commonStyle.content1}>
                        
                    </View>
                </View>
            </Image>
        );
    }
}

export default Groups;