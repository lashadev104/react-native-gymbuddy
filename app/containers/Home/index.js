import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Header from './../../components/Header';
import User from './../../components/User';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles';

import { users } from './../../constants/users.js';

class Home extends Component {

    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <Header back={false} notification={true} title=""/>
                    <View style={commonStyle.content1}>
                        <SearchBar
                            placeholder="Search..."
                            round
                            containerStyle={{width: '95%', backgroundColor: 'rgba(0,0,0,0)', borderTopWidth: 0, borderBottomWidth: 0, marginTop: 15}}
                            inputStyle={{width: '95%', backgroundColor: '#494d52', color: 'white', padding: 5}}
                        />
                        <TouchableOpacity>
                            <Text style={{color: '#20d471', alignSelf: 'center'}}>+ advanced search</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.userlist} showsVerticalScrollIndicator={false}>
                        {
                            users.map((user, index) => {
                                return (
                                    <User key={index} user={user} />
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

export default Home;