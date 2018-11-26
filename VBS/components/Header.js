import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Font } from 'expo';
import Colors from '../constants/Colors';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'open-sans-regular': OpenSansRegular,
        'open-sans-semi-bold': OpenSansSemiBold,
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rooster}>{this.props.headerText}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    rooster: {
      fontSize: 20, 
      fontFamily: 'open-sans-semi-bold',
      marginLeft: 0,
      color: Colors.VBSBlue,
      textAlign: 'center',
    },
    container: {
      backgroundColor: 'white',
      paddingTop: 40,
      paddingBottom: 10,
    }
});
