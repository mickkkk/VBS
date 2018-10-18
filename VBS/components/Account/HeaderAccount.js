import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SectionList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Font } from 'expo';
import Colors from '../../constants/Colors';

export default class HeaderAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'open-sans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-semi-bold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rooster}>Account</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    rooster: {
    fontSize:20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft:0,
    color:Colors.VBSBlue,
    textAlign:"center",
    },
    container: {
        backgroundColor:'white',
        paddingTop: 40,
        paddingBottom: 10,
    }
});
