import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

const imgRobotDev = require('./assets/images/robot-dev.png');
const imgRobotProd = require('./assets/images/robot-prod.png');
const SpaceMonoRegular = require('./assets/fonts/SpaceMono-Regular.ttf');

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAeGaTaMbHfXQ3nUiXiIGtUJAH4OYeHExk',
      authDomain: 'vastgoedbs-663cd.firebaseapp.com',
      databaseURL: 'https://vastgoedbs-663cd.firebaseio.com',
      projectId: 'vastgoedbs-663cd',
      storageBucket: 'vastgoedbs-663cd.appspot.com',
      messagingSenderId: '786621546607'
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
  }

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        imgRobotDev,
        imgRobotProd
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': SpaceMonoRegular
      })
    ]);

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <LoginForm />
          {/* <AppNavigator /> */}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
