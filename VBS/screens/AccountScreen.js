import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderAccount from '../components/Account/HeaderAccount';
import {View} from 'react-native';
import Colors from '../constants/Colors';
import {tabView, TabBar, SceneMap} from 'react-native-tab-view';


export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontLoaded: false};
  }
  
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-semi-bold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderAccount/>
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
            * content, we just wanted to provide you with some helpful links */}
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  rooster: {
    fontSize:20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft:0,
    color:Colors.VBSBlue,
    textAlign:"center",
  },
});
