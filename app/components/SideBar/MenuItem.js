import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, CheckBox } from 'react-native-elements';

import { closeDrawer } from './../../actions/drawer';
import { signOut } from './../../actions/auth';

import commonStyle from './../../config/styles.js';
import styles from './styles.js';

class MenuItem extends Component {

    constructor(props) {
        super(props);
    }
    onPressMenu = () => {
        console.log("scene", this.props.scene);
        if (this.props.icon === 'logout'){
            this.props.signOut();
        }
        Actions[this.props.scene].call();
        this.props.closeDrawer();
    }
    render() {
        return (
            <TouchableHighlight onPress={this.onPressMenu} underlayColor="#565b61">
                <View style={styles.menuitem} >
                    <CheckBox title={this.props.name} checkedIcon="ios-person" uncheckedIcon={this.props.icon} component={View}
                    iconType={this.props.type} containerStyle={styles.checkbox} textStyle={{color: 'white'}} />
                    <Icon name='keyboard-arrow-right' type='material' color='#b6b7b9' />
                </View>
            </TouchableHighlight>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeDrawer: () => dispatch(closeDrawer()),
    signOut: () => dispatch(signOut())
});

export default connect(null, mapDispatchToProps)(MenuItem);