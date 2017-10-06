import React from 'react';
import { connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';

import { closeDrawer } from './app/actions/drawer';

import Splash from './app/containers/Splash';
import Login from './app/containers/Login';
import SignUp from './app/containers/SignUp';
import Profile from './app/containers/Profile';
import Home from './app/containers/Home';
import BuddyList from './app/containers/BuddyList';
import Settings from './app/containers/Settings';
import Groups from './app/containers/Groups';
import About from './app/containers/About';
import Chat from './app/containers/Chat';

import SideBar from './app/components/SideBar';

const scenes = Actions.create(
	<Scene key="root">
		<Scene key="splash" hideNavBar panHandlers={null} component={Splash} />
		<Scene key="login" hideNavBar panHandlers={null} component={Login} />
		<Scene key="signup" hideNavBar panHandlers={null} component={SignUp} />
		<Scene key="profile" hideNavBar panHandlers={null} component={Profile} />
		<Scene key="home" hideNavBar panHandlers={null} component={Home} />
    <Scene key="buddy" hideNavBar panHandlers={null} component={BuddyList} />
    <Scene key="settings" hideNavBar panHandlers={null} component={Settings} />
    <Scene key="groups" hideNavBar panHandlers={null} component={Groups} />
    <Scene key="about" hideNavBar panHandlers={null} component={About} />
    <Scene key="chat" hideNavBar panHandlers={null} component={Chat} />
	</Scene>
);

const RouterWithRedux = connect()(Router);

class AppNavigator extends React.Component {
    componentWillReceiveProps(nextProps){
        if (nextProps.drawerState === 'opened') {
            this._drawer.open();
          }
          if (nextProps.drawerState === 'closed') {
            this._drawer.close();
          }
    }
    closeDrawer() {
        if (this.props.drawerState === 'opened') {
          this.props.closeDrawer();
        }
      }
	render() {
		return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<SideBar />}
                tapToClose={true}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.15} >
                <RouterWithRedux scenes={scenes} animation='fade'>
                </RouterWithRedux>
            </Drawer>
		);
	}
}

const mapStateToProps = (state) => ({
	drawerState: state.drawer.drawerState,
});

const mapDispatchToProps = (dispatch) => ({
	closeDrawer: () => dispatch(closeDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);