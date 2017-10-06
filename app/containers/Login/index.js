import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Actions
import { loginRequest } from './../../actions/auth';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    gotoScene = (key) => {
        Actions[key].call();
    }
    _handleChangeText = (name, text) => {
        this.setState({ [name]: text });
    }
    _handleLogin = () => {
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
        this.props.loginRequest(this.state.email, this.state.password)
        .then((res) => {
            this.gotoScene('home');
        })
        .catch((err) => {
            Alert.alert(
                '',
                err,
            )
        })
    }
    render() {
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <View style={commonStyle.content}>
                        <View style={styles.content}>
                            <Image source={images.logo} style={commonStyle.logoImage} />
                        </View>
                        <View style={styles.content}>
                            <View style={commonStyle.inputView}>
                                <TextInput style={commonStyle.textInput} autoCapitalize="none"
                                    placeholder="Email" placeholderTextColor="#afb1b3"
                                    onChangeText={(text) => this._handleChangeText('email', text)} />
                            </View>
                            <View style={commonStyle.inputView}>
                                <TextInput style={commonStyle.textInput} autoCapitalize="none"
                                 placeholder="PassWord" placeholderTextColor="#afb1b3" secureTextEntry={true}
                                 onChangeText={(text) => this._handleChangeText('password', text)} />
                            </View>
                            { this.props.loading? <ActivityIndicator animating={true} color="#20d471" size="large" />
                            :<TouchableOpacity style={commonStyle.buttonView} onPress={this._handleLogin}>
                                <Text style={commonStyle.buttonText}>Log In</Text>
                            </TouchableOpacity>
                            }
                            <View style={{flexDirection:'row', padding: 5, margin: 5}}>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: '#20d471'}}>forgot password?</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>&nbsp;&nbsp;or&nbsp;&nbsp;</Text>
                                <TouchableOpacity onPress={() => this.gotoScene('signup')}>
                                    <Text style={{fontSize: 12, backgroundColor: 'rgba(0,0,0,0)', color: '#20d471'}}>Register?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={commonStyle.footer}>
                        <Text style={commonStyle.footerText}>Copyright &copy; 2017</Text>
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    loginRequest: (email, password) => dispatch(loginRequest(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);