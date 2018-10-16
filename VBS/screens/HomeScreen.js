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

// const initialLayout = {
//   height: 0,
//   width: Dimensions.get('window').width,
// };

// state = {
//   fontLoaded: false,
// };

// const Page = ({label}) => (
//   <View style={styles.container}>
//     <Text style={styles.instructions}>
//       To get started, edit index.ios.js
//     </Text>
//     <Text style={styles.instructions}>
//       Press Cmd+R to reload,{'\n'}
//       Cmd+D or shake for dev menu
//     </Text>

//     <SectionList
//       renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
//       renderSectionHeader={({section: {title}}) => (
//         this.state.fontLoaded ? (
//         <Text style={{fontFamily: 'open-sans-regular',fontSize: 14,fontWeight: 'bold'}}>{title}</Text>
//         ) : <Text style={{fontSize: 24,fontWeight: 'bold'}}>{title}</Text>
//       )}
//       sections={[
//         {title: 'Maandag 10 September 2018', data: ['09:00 - 11:00', 'Kernmodule']},
//         {title: 'Title2', data: ['item3', 'item4']},
//         {title: 'Title3', data: ['item5', 'item6']},
//       ]}
//       keyExtractor={(item, index) => item + index}
//     />
//   </View>
// );


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <Text style={{marginLeft:23,}}>Week</Text>
          <View style={[styles.container, {paddingTop: 0}]}>
          <ScrollableTabView
              tabBarActiveTextColor="blue"
              renderTabBar={() => <TabBar 
                underlineColor="blue"
                underlineHeight= {3}
                tabMargin= {13}
                tabBarTextStyle={{fontSize:18,}}
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

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
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
