import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Badge } from 'react-native-elements';

import { openDrawer } from './../../actions/drawer';

import images from './../../config/images.js';
import commonStyle from './../../config/styles.js';
import styles from './styles.js';

class Header extends Component {

    constructor(props) {
        super(props);
    }
    onMenu = () => {
        if (!this.props.back){
            this.props.openDrawer();
        }else{
            Actions.pop();
        }
    }
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this.onMenu}>
                        { this.props.back?<Icon name="keyboard-backspace" type="material" size={30} color="white" />
                            :<Icon name="menu" type="simple-line-icon" size={30} color="white" />
                        }
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        { this.props.title===""?<Image source={images.logo_text} style={commonStyle.logoTextImage} resizeMode="cover" />
                            :<Text style={{fontSize: 20, color: 'white'}}>{this.props.title}</Text>
                        }
                    </View>
                    <TouchableOpacity style={{marginRight: 10, flexDirection: 'column', justifyContent: 'center'}}>
                        <Icon name="bell" type="simple-line-icon" size={23} color="white" />
                        { this.props.notification &&
                        <Badge value={3} containerStyle={styles.badge} textStyle={{color: 'white'}} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    openDrawer: () => dispatch(openDrawer())
})

export default connect(null, mapDispatchToProps)(Header);