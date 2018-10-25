import React from 'react';
import { ScrollView, StyleSheet, Font } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderBerichten from '../components/Berichten/HeaderBerichten';
import Chat from '../components/Berichten/Chat';
import {View} from 'react-native';
import Colors from '../constants/Colors';

export default class BerichtenScreen extends React.Component {
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
        <HeaderBerichten/>
          <Chat/>
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
