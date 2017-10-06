import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Hr from 'react-native-hr';

//Actions
import { signupRequest } from './../../actions/auth';

//Components
import SocialLogin from './../../components/SocialLogin';

//Config & Global variables.
import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles.js';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
        }
    }

    gotoScene = (key) => {
        Actions[key].call();
    }
    _handleSignUp = () => {
        if (this.state.email === ''){
            Alert.alert(
                'Alert',
                'Please Input Email',
            )
            return;
        }
        if (this.state.password === ''){
            Alert.alert(
                'Alert',
                'Please Input Password',
            )
            return;
        }
        if (this.state.username === ''){
            Alert.alert(
                'Alert',
                'Please Input User Name',
            )
            return;
        }
        let profileData = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            fullname: '',
            city: '',
            address: '',
            avatar: '',
            gender: [true, false, false],
            age: [false, false, false],
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
                    {text: 'OK', onPress: () => this.gotoScene('profile')}
                ]
            )
        })
        .catch((err) => {
            Alert.alert(
                'Alert',
                err,
            )
        })
    }
    _handleChangeText = (name, text) => {
        this.setState({ [name]: text });
    }
    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    { this.props.socialLoading? <ActivityIndicator animating={true} color="#20d471" size="large" />
                    :<View style={[commonStyle.content, {paddingTop: 40, paddingBottom: 10}]}>
                        <Image source={images.logo} style={commonStyle.logoImage} />
                        <SocialLogin />
                        <View style={styles.lineWithText}>
                            <Hr lineColor='#828589' text='or' textColor='white' />
                        </View>
                        <View>
                            <Text style={{fontSize: 15, textAlign: 'center', color: 'white', marginBottom: 10}}>Sign up using email</Text>
                            <View style={commonStyle.inputView}>
                                <TextInput style={commonStyle.textInput} autoCapitalize="none"
                                    placeholder="User Name" placeholderTextColor="#afb1b3" 
                                    onChangeText={(text) => this._handleChangeText('username', text)} />
                            </View>
                            <View style={commonStyle.inputView}>
                                <TextInput style={commonStyle.textInput} secureTextEntry={true} autoCapitalize="none"
                                    placeholder="PassWord" placeholderTextColor="#afb1b3"
                                    onChangeText={(text) => this._handleChangeText('password', text)} />
                            </View>
                            <View style={commonStyle.inputView}>
                                <TextInput style={commonStyle.textInput} autoCapitalize="none"
                                    placeholder="Email" placeholderTextColor="#afb1b3"
                                    onChangeText={(text) => this._handleChangeText('email', text)} />
                            </View>
                            { this.props.loading? <ActivityIndicator animating={true} color="#20d471" size="large" />
                            :<TouchableOpacity style={commonStyle.buttonView} onPress={this._handleSignUp}>
                                <Text style={commonStyle.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                            }
                            <View style={{flexDirection: 'row', justifyContent: 'center', padding: 5, margin: 5}}>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>have already account?</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                <TouchableOpacity onPress={() => this.gotoScene('login')}>
                                    <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: '#20d471'}}>Log in</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    }
                    { !this.props.socialLoading &&
                    <View style={commonStyle.footer}>
                        <Text style={commonStyle.footerText}>Copyright &copy; 2017</Text>
                    </View>
                    }
                </View>
            </Image>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.isLoading,
    socialLoading: state.auth.isSocial,
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    signupRequest: (profile) => dispatch(signupRequest(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);