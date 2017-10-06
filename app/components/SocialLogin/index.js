import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import { Google } from 'expo';

//Actions
import { socialSignUpRequest, socialSignUpFail, signupRequest } from './../../actions/auth';

import images from './../../config/images.js';
import styles from './styles.js';

import firebase from './../../config/firebase';

class SocialLogin extends Component {

    _handleGoogleLogin = async () => {
        this.props.socialSignUpRequest();
        try {
            const { type, user } = await Google.logInAsync({
                androidStandaloneAppClientId: '',
                iosStandaloneAppClientId: '',
                androidClientId: '812285224102-9eg3oeq3rihpqeur9m0quuimife4095i.apps.googleusercontent.com',
                iosClientId: '812285224102-2evruak0dg6p9hr7o5rt8kunbqu8bmpd.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });
            switch (type) {
                case 'success': {
                    console.log("google user", user);
                    let profileData = {
                        email: user.email,
                        password: '123456',
                        username: user.name,
                        fullname: user.name,
                        city: '',
                        address: '',
                        avatar: user.photoUrl,
                        gender: [true, false, false],
                        age: [true, false, false],
                        training: [true, false],
                        interest: [false, false, false, false],
                        worktime: 0,
                        isCompleted: false,
                    }
                    this.props.signupRequest(profileData)
                        .then((res) => {
                            Alert.alert(
                                'Notification',
                                'Successfully registered!',
                                [
                                    { text: 'OK', onPress: Actions.profile }
                                ]
                            )
                        })
                        .catch((err) => {
                            Alert.alert(
                                'Alert',
                                err,
                            )
                        })
                    break;
                }
                case 'cancel': {
                    this.props.socialSignUpFail();
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled',
                    );
                    break;
                }
                default: {
                    this.props.socialSignUpFail();
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            this.props.socialSignUpFail();
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    }

    _handleFacebookLogin = async () => {
        this.props.socialSignUpRequest();
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                '1201211719949057', // Replace with your own app id in standalone app
                { permissions: ['public_profile'] }
            );

            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                    const profile = await response.json();
                    Alert.alert(
                        'Logged in!',
                        `Hi ${profile.name}!`,
                    );
                    break;
                }
                case 'cancel': {
                    this.props.socialSignUpFail();
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    this.props.socialSignUpFail();
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            this.props.socialSignUpFail();
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    }

    render() {
        return (
            <View style={styles.socialView}>
                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>Create your account using your favorite social network!</Text>
                <View style={styles.socilIcons}>
                    <SocialIcon type='facebook' onPress={this._handleFacebookLogin} />
                    <SocialIcon type='twitter' />
                    <SocialIcon type='google-plus' style={{ backgroundColor: '#dc4335' }} onPress={this._handleGoogleLogin} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    socialSignUpRequest: () => dispatch(socialSignUpRequest()),
    socialSignUpFail: () => dispatch(socialSignUpFail()),
    signupRequest: (profile) => dispatch(signupRequest(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);