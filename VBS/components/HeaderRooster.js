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

import { MonoText } from '../components/StyledText';

import Schedule from '../components/Schedule';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontLoaded: false};
  }
  
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-semi-bold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.rooster}>Rooster</Text>
          <Text style={{fontSize:14, fontFamily: 'open-sans-regular',marginLeft:23,}}>Week</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    rooster: {
    fontSize:20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft:0,
    //marginTop:43,
    color:Colors.VBSBlue,
    textAlign:"center",
    },
    container: {
        backgroundColor:'white',
        paddingTop: 40,
    }
});
