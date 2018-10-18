import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import HeaderMijnOpleiding from '../components/MijnOpleiding/HeaderMijnOpleiding';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import {TabView, SceneMap} from 'react-native-tab-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Schedule from '../components/Rooster/Schedule';

import Modules from '../components/MijnOpleiding/Modules';
import Cijfers from '../components/MijnOpleiding/Cijfers';

export default class MijnOpleidingScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <HeaderMijnOpleiding/>
        <ScrollView style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor= {Colors.VBSBlue}
          tabBarUnderlineStyle= {'red'}
          tabBarPosition={"top"}
          renderTabBar={() => <TabBar 
            underlineColor={Colors.VBSBlue}
            underlineHeight= {3}
            tabMargin= {0}
            tabBarTextStyle={{fontSize:18, fontFamily: 'open-sans-regular'}}
            />}>
          <Modules tabLabel={{label: "         Modules         "}} name="1"/>
          <Cijfers tabLabel={{label: "         Cijfers         "}} name="17"/>
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
    fontSize:20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft:0,
    color:Colors.VBSBlue,
    textAlign:"center",
  },
});
