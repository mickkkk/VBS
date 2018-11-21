import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import { Font, AppLoading } from 'expo';
import React from 'react';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import Colors from '../constants/Colors';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');
const Arrow = require('../assets/images/arrow.png');

export default class BerichtenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentWillMount() {
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

  onPressChat() {
    Actions.chat();
    //this.props.navigation.navigate('Chat', { title: titleMod });
}

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.day}>
            <TouchableHighlight 
              onPress={this.onPressChat.bind(this)} 
              underlayColor="white"
            >
                <View style={styles.item}>
                    <View style={styles.module}>
                        <Text style={styles.title}>Klas N21</Text>
                        <Text style={styles.subtitle}>Mick: Hier mijn laatste bericht</Text>
                    </View>
                    <Image style={styles.img} source={Arrow} />
                </View>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#F4F4F4',
  },
  rooster: {
    fontSize: 20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft: 0,
    color: Colors.VBSBlue,
    textAlign: 'center',
  },
  img: {
    height: 23,
    width: 23,
    position: 'absolute',
    right: 12,
    top: 20,
    marginTop: 11,
  },
  day: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#C3C1C1',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    overflow: 'hidden',
  },
  item: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
    paddingVertical: 20,
    //paddingHorizontal: 0,
  },
  module: {
    //backgroundColor: "green",
    //flexGrow: 2,
    marginLeft: 12,
    marginRight: 30,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    color: Colors.VBSBlue,
  },
  subtitle: {
      fontFamily: 'open-sans-regular',
      fontSize: 11,
  },
});
