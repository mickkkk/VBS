import { ScrollView, StyleSheet, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import React from 'react';
import Header from '../components/Header';
import Colors from '../constants/Colors';

import Modules from '../components/MijnOpleiding/Modules';
import Cijfers from '../components/MijnOpleiding/Cijfers';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');

export default class MijnOpleidingScreen extends React.Component {
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

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'modules':
        return <Modules />;
      case 'cijfers':
        return <Cijfers />;
      default:
        return null;
    }
  };

  _onPressModule = () => {
    this.props.navigation.navigate('Module');
    //this.props.navigation.push('Rooster');
}

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor={Colors.VBSBlue}
          tabBarUnderlineStyle={'red'}
          tabBarPosition={'top'}
          renderTabBar={() => <TabBar 
            underlineColor={Colors.VBSBlue}
            underlineHeight={3}
            tabMargin={0}
            tabBarTextStyle={{ fontSize: 18, fontFamily: 'open-sans-regular' }}
          />}
        >
          <Modules 
            tabLabel={{ label: '         Modules         ' }} 
            name="1" 
            navigation={this.props.navigation} 
          />
          <Cijfers tabLabel={{ label: '         Cijfers         ' }} name="17" />
        </ScrollableTabView>
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
    fontSize: 20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft: 0,
    color: Colors.VBSBlue,
    textAlign: 'center',
  },
});
