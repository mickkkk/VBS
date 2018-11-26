import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import Colors from '../../constants/Colors';
import Panel from './Panel';

import Content from './Content';
import Flipped from './Flipped';


const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

export default class ModuleDetail extends React.Component {
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
    Actions.refresh({ title: this.props.module.titel });
  }

  
  render() {
   // const { introductie, lesstof, geluidsfragment, oefentoetsen, reacties } = this.props.module;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.tabbar}>
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
          <Content 
          tabLabel={{ label: '         Content         ' }}
           module={this.props.module} 
          />
          
          <Flipped 
            tabLabel={{ label: 'Flipped Classroom' }}
            module={this.props.module} 
          />
        </ScrollableTabView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    body: {
      fontSize: 11,
      color: 'black',
      fontFamily: 'open-sans-regular'
  },
  tabbar: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  tabview: {
      marginTop: -15
  },
});
