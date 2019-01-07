import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Font, AppLoading } from 'expo';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import Schedule1 from '../components/Rooster/Schedule1';
import Schedule2 from '../components/Rooster/Schedule2';
import Schedule3 from '../components/Rooster/Schedule3';
import Schedule4 from '../components/Rooster/Schedule4';
import Schedule5 from '../components/Rooster/Schedule5';
import Schedule6 from '../components/Rooster/Schedule6';
import Schedule7 from '../components/Rooster/Schedule7';
import Schedule8 from '../components/Rooster/Schedule8';
import Schedule9 from '../components/Rooster/Schedule9';
import Schedule10 from '../components/Rooster/Schedule10';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');

export default class RoosterScreen extends React.Component {
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
  }
  
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
      }
    return (
      <View style={styles.container}>
        <Header headerText="Rooster" />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text 
            style={{ 
              fontSize: 14, 
              fontFamily: 'open-sans-regular', 
              marginLeft: 23 
            }}
          >Week</Text>
          <ScrollableTabView
              tabBarActiveTextColor={Colors.VBSBlue}
              tabBarUnderlineStyle={'red'}
              tabBarPosition={'top'}
              renderTabBar={() => <TabBar 
                underlineColor={Colors.VBSBlue}
                underlineHeight={3}
                tabMargin={13}
                tabBarTextStyle={{ fontSize: 18, fontFamily: 'open-sans-regular' }}
              />}
          >
            <Schedule1 tabLabel={{ label: '    1    ' }} name="1" />
            <Schedule2 tabLabel={{ label: '    2    ' }} name="17" />
            <Schedule3 tabLabel={{ label: '    3    ' }} label="3" />
            <Schedule4 tabLabel={{ label: '    4    ' }} label="4" />
            <Schedule5 tabLabel={{ label: '    5    ' }} label="5" />
            <Schedule6 tabLabel={{ label: '    6    ' }} label="6" />
            <Schedule7 tabLabel={{ label: '    7    ' }} label="7" />
            <Schedule8 tabLabel={{ label: '    8    ' }} label="8" />
            <Schedule9 tabLabel={{ label: '    9    ' }} label="9" />
            <Schedule10 tabLabel={{ label: '    10   ' }} label="10" />
          </ScrollableTabView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    //paddingTop: -10,
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
