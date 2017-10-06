import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles.js';

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            Actions.login();
        }, 1000);
    }
    render() {
        return (
            <View style={commonStyle.container}>
                <LinearGradient colors={['#2f343a', '#4d5156', '#2f343a']} style={{flex: 1}}>
                    <View style={styles.logoView}>
                        <Image source={images.logo} style={commonStyle.logoImage} />
                    </View>
                    <View style={commonStyle.footer}>
                        <Text style={commonStyle.footerText}>Copyright &copy; 2017</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

export default Splash;