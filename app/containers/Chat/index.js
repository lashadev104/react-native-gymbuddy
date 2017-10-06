import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Avatar, Bubble, InputToolbar } from 'react-native-gifted-chat';

import Header from './../../components/Header';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: ':)',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        avatar: images.profile_photo,
                    },
                },
                {
                    _id: 2,
                    text: 'Okay!',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        avatar: this.props.avatar,
                    },
                },
                {
                    _id: 3,
                    text: 'Lorem ipsum dolor sit maamet, consectetur elit.',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        avatar: images.profile_photo,
                    },
                },
                {
                    _id: 4,
                    text: 'Lorem ipsum dolor sit maamet, consectetur tipsele adipisicing elit, sed do.',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        avatar: images.profile_photo
                    },
                },
                {
                    _id: 5,
                    text: 'Lorem ipsum dolor sit maamet, consectetur tipsele adipisicing elit, sed do.\neiusmod tempor incadut',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        avatar: this.props.avatar,
                    },
                },
                {
                    _id: 6,
                    text: 'Hey! How are you?',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        avatar: images.profile_photo
                    },
                }
            ]
        }
    }
    componentWillMount(){
        console.log("after", this.props);
    }

    onSend(messages = []){
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }
    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <Header back={true} notification={false} title={this.props.username}/>
                    <View style={commonStyle.content1}>
                        <GiftedChat
                            messages={this.state.messages}
                            showUserAvatar={true}
                            renderAvatarOnTop={true}
                            onSend={(messages) => this.onSend(messages)}
                            user={{_id: 1, avatar: images.profile_photo}}
                            renderAvatar = {(props) => {
                                return (
                                    <Avatar {...props}
                                        imageStyle={{
                                            left: { borderColor: '#20d471', borderWidth: 2, width: 50, height: 50, borderRadius: 25 },
                                            right: { borderColor: '#20d471', borderWidth: 2, width: 50, height: 50, borderRadius: 25 }
                                        }}
                                        containerStyle={{
                                            left: { width: 50, height: 50, borderRadius: 25 },
                                            right: { width: 50, height: 50, borderRadius: 25 },
                                        }}
                                    />
                                )
                            }}
                            renderInputToolbar = {(props) => {
                                return (
                                    <InputToolbar {...props}
                                        containerStyle={{ backgroundColor: '#43484d' }}
                                        textInputStyle={{ color: 'white' }}
                                        textStyle={{ color: '#12b355' }}
                                    />
                                )
                            }}
                            renderBubble = {(props) => {
                                return (
                                    <Bubble {...props} 
                                        wrapperStyle={{
                                            left: { backgroundColor: '#12b355' },
                                            right: { backgroundColor: '#4f5459' }
                                        }}
                                        textStyle={{
                                            left: { color: 'white' }
                                        }}
                                    />
                                )
                            }}
                        />
                    </View>
                </View>
            </Image>
        );
    }
}

export default Chat;