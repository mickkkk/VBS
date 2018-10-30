import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Font } from 'expo';
import Colors from '../../constants/Colors';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

export default class ModuleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle: { 
       fontFamily: 'open-sans-regular', 
       fontSize: 20, 
       marginLeft: -30, 
       marginRight: -30, 
       textAlign: 'left', 
       alignSelf: 'center', 
       color: Colors.VBSBlue 
      },
        headerStyle: {
            backgroundColor: 'white',
        },
    });
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
        <Text style={styles.rooster}>{this.props.navigation.state.params.name}</Text>
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
