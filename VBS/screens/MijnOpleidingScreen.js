import { ScrollView, StyleSheet, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import React from 'react';
import Colors from '../constants/Colors';
import Header from '../components/Header';

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

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <Header headerText="Mijn Opleiding" />
        <ScrollableTabView
          style={styles.tabview}
          tabBarActiveTextColor={Colors.VBSBlue}
          tabBarUnderlineStyle={'red'}
          tabBarPosition={'top'}
          tabBarBackgroundColor='white'
          renderTabBar={() => <TabBar 
            underlineColor={Colors.VBSBlue}
            underlineHeight={3}
            tabMargin={0}
            tabBarPosition="top"
            tabBarTextStyle={{ paddingTop: 10, fontSize: 18, fontFamily: 'open-sans-regular' }}
          />}
        >
          <Modules 
            tabLabel={{ label: '         Modules         ' }} 
          />
          <Cijfers 
            tabLabel={{ label: '         Cijfers         ' }} 
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#F4F4F4',
  },
  tabview: {
    flex: 1,
    marginTop: -15
  },
  rooster: {
    fontSize: 20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft: 0,
    color: Colors.VBSBlue,
    textAlign: 'center',
  },
});
