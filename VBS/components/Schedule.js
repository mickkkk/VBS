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
import Colors from '../constants/Colors';

import { MonoText } from '../components/StyledText';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";

// const initialLayout = {
//   height: 0,
//   width: Dimensions.get('window').width,
// };
export default class Schedule extends React.Component {
  
    static navigationOptions = {
    header: null,
  };
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
    return <Expo.AppLoading />;
    }
    return (
        <View style={styles.container}>
            {/* <Text>Week {this.props.name}!</Text> */}
            <View style={styles.day}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Maandag 10 September</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>09:00-11:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Kernmodule Business Case</Text>
                        <Text style={styles.teacher}>W.van Gerwen</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>11:00-13:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Vastgoedwaarde</Text>
                        <Text style={styles.teacher}>P.Pieters</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
            </View>

            <View style={styles.day}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Dinsdag 11 September</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>09:00-11:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Kernmodule Business Case</Text>
                        <Text style={styles.teacher}>W.van Gerwen</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>11:00-13:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Vastgoedwaarde</Text>
                        <Text style={styles.teacher}>P.Pieters</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
            </View>

            <View style={styles.day}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Woensdag 12 September</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>09:00-11:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Kernmodule Business Case</Text>
                        <Text style={styles.teacher}>W.van Gerwen</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>11:00-13:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Vastgoedwaarde</Text>
                        <Text style={styles.teacher}>P.Pieters</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
            </View>

            <View style={styles.day}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Donderdag 13 September</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>09:00-11:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Kernmodule Business Case</Text>
                        <Text style={styles.teacher}>W.van Gerwen</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>11:00-13:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Vastgoedwaarde</Text>
                        <Text style={styles.teacher}>P.Pieters</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
            </View>

            <View style={styles.day}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Vrijdag 14 September</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>09:00-11:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Kernmodule Business Case</Text>
                        <Text style={styles.teacher}>W.van Gerwen</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.item}>
                    <Text style={styles.time}>11:00-13:00</Text>
                    <View style={styles.lessonTeacher}>
                        <Text style={styles.lesson}>Vastgoedwaarde</Text>
                        <Text style={styles.teacher}>P.Pieters</Text>
                    </View>
                    <Text style={styles.place}>Utrecht</Text>
                </View>
            </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    line: {
        backgroundColor:'#C3C1C1',
        height: 0.5,
    },
    line2: {
        backgroundColor:'#C3C1C1',
        height: 0.5,
        marginHorizontal: 12,
    },
    day:{
        backgroundColor: 'white',
        borderRadius:10,
        borderWidth: 0.5,
        borderColor: '#C3C1C1',
        display: 'flex',
        flexDirection: 'column',
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        overflow: 'hidden',
        
        
    },
    header:{
        backgroundColor: 'white',
        paddingVertical: 23.5,
        paddingLeft:12,
    },
    headerText:{
        color: Colors.VBSBlue,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'open-sans-bold',
    },
    item:{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        //justifyContent: 'space-between',
        paddingVertical: 20,
        //paddingHorizontal: 0,
    },
    time: {
        fontSize:11,
        marginLeft: 12,
        marginTop:11,
        fontFamily: 'open-sans-regular',
        color:Colors.VBSBlue,
        //flexGrow:1,
    },
    lesson: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        color:Colors.VBSBlue,
    },
    teacher: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
    },
    place: {
        position: 'absolute',
        right:12,
        top: 20,
        fontFamily: 'open-sans-regular',
        fontSize: 11,
        color:Colors.VBSBlue,
        marginTop:11,
        //backgroundColor: 'yellow',
        
        //marginRight: 12,
    },
    lessonTeacher:{
        //backgroundColor: "green",
        //flexGrow: 2,
        marginLeft: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop:5,
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
