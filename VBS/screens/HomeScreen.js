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
import HeaderRooster from '../components/HeaderRooster';

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
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />;
      }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <HeaderRooster/>
          <View style={[styles.container, {paddingTop: 0}]}>
          <ScrollableTabView
              tabBarActiveTextColor= {Colors.VBSBlue}
              renderTabBar={() => <TabBar 
                underlineColor={Colors.VBSBlue}
                underlineHeight= {3}
                tabMargin= {13}
                tabBarTextStyle={{fontSize:18, fontFamily: 'open-sans-regular'}}
                />}>
            <Schedule tabLabel={{label: "    1    "}} name="10"/>
            <Schedule tabLabel={{label: "    2    "}} name="17"/>
            <Schedule tabLabel={{label: "    3    "}} label="3"/>
            <Schedule tabLabel={{label: "    4    "}} label="4"/>
            <Schedule tabLabel={{label: "    5    "}} label="5"/>
            <Schedule tabLabel={{label: "    6    "}} label="6"/>
            <Schedule tabLabel={{label: "    7    "}} label="7"/>
            <Schedule tabLabel={{label: "    8    "}} label="8"/>
            <Schedule tabLabel={{label: "    9    "}} label="9"/>
            <Schedule tabLabel={{label: "    10   "}} label="10"/>
          </ScrollableTabView>
        </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
rooster: {
  fontSize:20, 
  fontFamily: 'open-sans-semi-bold',
  marginLeft:23,
  color:Colors.VBSBlue,
  textAlign:"center",
},

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
