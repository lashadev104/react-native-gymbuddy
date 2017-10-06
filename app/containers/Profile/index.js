import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Avatar, CheckBox, Slider } from 'react-native-elements';

// Actions
import { completeProfile } from './../../actions/auth';

// For take picture
// import RNFetchBlob from 'react-native-fetch-blob';
import { ImagePicker } from 'expo';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles.js';

import firebase, { firebaseStorage } from './../../config/firebase';
import b64 from 'base64-js';

const avatarIcon = {
    name: 'camera',
    color: '#20d471',
    type: 'simple-line-icon'
}

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            gender: [true, false, false],
            age: [true, false, false],
            training: [true, false],
            interest: [false, false, false, false],
            worktime: 0,
            fullname: '',
            city: '',
            address: '',
            avatar: '',
        }
    }
    componentWillMount() {
        this.setState({ gender: this.props.profile.gender });
        this.setState({ age: this.props.profile.age });
        this.setState({ training: this.props.profile.training });
        this.setState({ interest: this.props.profile.interest });
        this.setState({ worktime: this.props.profile.worktime });
        this.setState({ fullname: this.props.profile.fullname });
        this.setState({ city: this.props.profile.city });
        this.setState({ address: this.props.profile.address });
        this.setState({ avatar: this.props.profile.avatar });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isCompleted) {
            Actions.home();
        }
    }
    selectGender = (index) => {
        let temp = [false, false, false];
        temp[index] = true;
        this.setState({ gender: temp });
    }
    selectAge = (index) => {
        let temp = [false, false, false];
        temp[index] = true;
        this.setState({ age: temp });
    }
    selectTraining = (index) => {
        let temp = [false, false];
        temp[index] = true;
        this.setState({ training: temp });
    }
    selectInterest = (index) => {
        let temp = this.state.interest;
        temp[index] = !temp[index];
        this.setState({ interest: temp });
    }
    min2Time = (time) => {
        let h = parseInt(time / 60);
        let m = time % 60;
        if (h === 0) return m + ' mins';
        if (h === 1 && m === 0) return h + ' hr';
        if (h === 2 && m === 0) return h + ' hrs';
        if (h === 3 && m === 0) return h + ' hrs';
        return h + '.' + m + ' hrs';
    }
    _handleChangeText = (name, text) => {
        this.setState({ [name]: text });
    }
    _handleCompleteProfile = () => {
        var completedProfile = this.props.profile;

        completedProfile.fullname = this.state.fullname;
        completedProfile.city = this.state.city;
        completedProfile.address = this.state.address;
        completedProfile.gender = this.state.gender;
        completedProfile.age = this.state.age;
        completedProfile.training = this.state.training;
        completedProfile.interest = this.state.interest;
        completedProfile.worktime = this.state.worktime;
        completedProfile.isCompleted = 'true';
        this.props.completeProfile(this.props.uid, completedProfile);
    }
    _takePicture = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.8,
            base64: true
        });
        if (!result.cancelled) {
            let byteArray = this.convertToByteArray(result.base64);

            // const imageRef = firebaseStorage.ref('/avatars');
            // imageRef.child('my_pic.jpg').putString(result.base64, 'base64')
            // .then(snapshot => {
            //     console.log("image uploaded");
            // })
            // .catch((err) => {
            //     console.log(err);
            // })
            this._uploadAsByteArray(byteArray, (progress) => {
                console.log("progress", progress);
            })
            this.setState({ avatar: result.uri });
            
        }
    }
    convertToByteArray = (input) => {
        var binary_string = this.atob(input);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes
    }
    atob = (input) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
            buffer = str.charAt(i++);

            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    }
    _uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {

        try {

            var metadata = {
                contentType: 'image/jpeg',
            };

            var storageRef = firebase.storage().ref();
            var ref = storageRef.child('avatars/mountains.jpg')
            let uploadTask = ref.put(pickerResultAsByteArray, metadata)

            uploadTask.on('state_changed', function (snapshot) {

                progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

            }, function (error) {
                console.log("in _uploadAsByteArray ", error)
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL)
            });


        } catch (ee) {
            console.log("when trying to load _uploadAsByteArray ", ee)
        }
    }

    render() {
        const workTimeStyle = {
            marginLeft: this.state.worktime / 180 * Dimensions.get("window").width * 0.67
        }
        return (
            <Image source={images.background} resizeMode="cover" style={commonStyle.backgroundImage}>
                <View style={commonStyle.overlay}>
                    <ScrollView style={styles.content} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                        <Text style={styles.headerText}>Please complete your profile</Text>
                        { this.state.avatar === '' ? 
                        <Avatar xlarge rounded icon={avatarIcon} overlayContainerStyle={styles.avatarOverlayView}
                            component={TouchableOpacity} containerStyle={{ marginBottom: 20 }}
                            avatarStyle={styles.avatarView} onPress={this._takePicture} />
                        :<Avatar xlarge rounded source={{ uri: this.state.avatar }} overlayContainerStyle={styles.avatarOverlayView}
                            component={TouchableOpacity} containerStyle={{ marginBottom: 20 }}
                            avatarStyle={styles.avatarView} onPress={this._takePicture} />
                        }
                        <View style={styles.formElement}>
                            <Text style={styles.title}>FULL NAME</Text>
                            <TextInput style={styles.fieldText} autoCapitalize="none" value={this.state.fullname}
                                placeholder="Your Name" placeholderTextColor="white"
                                onChangeText={(text) => this._handleChangeText('fullname', text)} />
                        </View>
                        <View style={styles.formElement}>
                            <Text style={styles.title}>CITY</Text>
                            <TextInput style={styles.fieldText} autoCapitalize="none" value={this.state.city}
                                placeholder="Your City" placeholderTextColor="white"
                                onChangeText={(text) => this._handleChangeText('city', text)} />
                        </View>
                        <View style={styles.formElement}>
                            <Text style={styles.title}>ADDRESS</Text>
                            <TextInput style={styles.fieldText} autoCapitalize="none" value={this.state.address}
                                placeholder="" placeholderTextColor="white"
                                onChangeText={(text) => this._handleChangeText('address', text)} />
                        </View>
                        {/* Select Gender  */}
                        <View style={styles.formElement}>
                            <Text style={styles.title}>GENDER</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CheckBox title="Male" checkedIcon="symbol-male" uncheckedIcon="symbol-male"
                                    checkedColor="#20d471" iconType="simple-line-icon" checked={this.state.gender[0]}
                                    onPress={() => this.selectGender(0)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Female" checkedIcon="symbol-female" uncheckedIcon="symbol-female"
                                    checkedColor="#20d471" iconType="simple-line-icon" checked={this.state.gender[1]}
                                    onPress={() => this.selectGender(1)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Other" checkedIcon="mars-stroke" uncheckedIcon="mars-stroke"
                                    checkedColor="#20d471" checked={this.state.gender[2]}
                                    onPress={() => this.selectGender(2)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                            </View>
                        </View>
                        {/* Select Age */}
                        <View style={styles.formElement}>
                            <Text style={styles.title}>AGE</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CheckBox title="18-25" checkedIcon="circle" uncheckedIcon="circle-thin"
                                    checkedColor="#20d471" checked={this.state.age[0]}
                                    onPress={() => this.selectAge(0)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="26-30" checkedIcon="circle" uncheckedIcon="circle-thin"
                                    checkedColor="#20d471" checked={this.state.age[1]}
                                    onPress={() => this.selectAge(1)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Other" checkedIcon="circle" uncheckedIcon="circle-thin"
                                    checkedColor="#20d471" checked={this.state.age[2]}
                                    onPress={() => this.selectAge(2)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                            </View>
                        </View>
                        {/* Training preferences */}
                        <View style={styles.formElement}>
                            <Text style={styles.title}>TRAINING PREFERENCES</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CheckBox title="Partner/Buddy" checkedIcon="ios-person" uncheckedIcon="ios-person-outline"
                                    checkedColor="#20d471" iconType="ionicon" checked={this.state.training[0]}
                                    onPress={() => this.selectTraining(0)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Group" checkedIcon="ios-people" uncheckedIcon="ios-people-outline"
                                    checkedColor="#20d471" iconType="ionicon" checked={this.state.training[1]}
                                    onPress={() => this.selectTraining(1)}
                                    containerStyle={styles.checkbox}
                                    textStyle={{ color: 'white' }} />
                            </View>
                        </View>
                        {/* Interests */}
                        <View style={[styles.formElement, { borderBottomWidth: 0 }]}>
                            <Text style={styles.title}>INTERESTS</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <CheckBox title="Body Building" checkedIcon="ios-body" uncheckedIcon="ios-body-outline"
                                    checkedColor="#20d471" iconType="ionicon" checked={this.state.interest[0]}
                                    onPress={() => this.selectInterest(0)}
                                    containerStyle={[styles.checkbox, { width: '50%' }]}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Running" checkedIcon="directions-run" uncheckedIcon="directions-run"
                                    checkedColor="#20d471" iconType="material" checked={this.state.interest[1]}
                                    onPress={() => this.selectInterest(1)}
                                    containerStyle={[styles.checkbox, { width: '50%' }]}
                                    textStyle={{ color: 'white' }} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox title="Crossfit" checkedIcon="fitness-center" uncheckedIcon="fitness-center"
                                    checkedColor="#20d471" iconType="material" checked={this.state.interest[2]}
                                    onPress={() => this.selectInterest(2)}
                                    containerStyle={[styles.checkbox, { width: '50%' }]}
                                    textStyle={{ color: 'white' }} />
                                <CheckBox title="Etc." checkedIcon="more-horiz" uncheckedIcon="more-horiz"
                                    checkedColor="#20d471" iconType="material" checked={this.state.interest[3]}
                                    onPress={() => this.selectInterest(3)}
                                    containerStyle={[styles.checkbox, { width: '50%' }]}
                                    textStyle={{ color: 'white' }} />
                            </View>
                        </View>
                        {/* WorkTime */}
                        <View style={[styles.formElement, { borderBottomWidth: 0 }]}>
                            <Text style={styles.title}>PREFERRED WORKOUT TIME</Text>
                            <Text style={[styles.worktime, workTimeStyle]}>{this.min2Time(this.state.worktime)}</Text>
                            <Slider value={this.state.worktime}
                                minimumValue={0} maximumValue={180} step={5}
                                minimumTrackTintColor='#20d471' maximumTrackTintColor='#494d52'
                                thumbTouchSize={{ width: 20, height: 20 }}
                                trackStyle={{ height: 10, borderRadius: 10 }} thumbStyle={{ backgroundColor: 'white', marginTop: 3 }}
                                onValueChange={(value) => this.setState({ worktime: value })} />

                        </View>
                        {this.props.loading ? <ActivityIndicator animating={true} color="#20d471" size="large" />
                            : <TouchableOpacity style={[commonStyle.buttonView, { marginBottom: 40 }]} onPress={this._handleCompleteProfile}>
                                <Text style={commonStyle.buttonText}>Save</Text>
                            </TouchableOpacity>
                        }
                        <View style={commonStyle.footer}>
                            <Text style={commonStyle.footerText}>Copyright &copy; 2017</Text>
                        </View>
                    </ScrollView>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
    loading: state.auth.isLoading,
    profile: state.auth.profile,
    isCompleted: state.auth.isCompleted,
});

const mapDispatchToProps = (dispatch) => ({
    completeProfile: (uid, data) => dispatch(completeProfile(uid, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);