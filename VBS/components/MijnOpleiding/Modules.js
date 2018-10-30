import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { Font, AppLoading } from 'expo';
import Colors from '../../constants/Colors';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');
const Arrow = require('../../assets/images/arrow.png');


export default class Modules extends React.Component {
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

  onPressModule = (titleMod) => {
      this.props.navigation.navigate('Module', { title: titleMod });
      //this.props.navigation.push('Rooster');
}
 
  render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />;
            }
            return (
                <View style={styles.container}>
                    {/* <Text>Week {this.props.name}!</Text> */}
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Kern Business Case')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Kernmodule Business Case</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Vastgoedwaarde')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Vastgoedwaarde</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Opbrengsten en kosten')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Opbrengsten en kosten</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Publiek- en privaatrecht')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Publiek- en privaatrecht</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Risicomanagement')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Risicomanagement</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Conceptontwikkeling')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Conceptontwikkeling</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Ontwerp-en bouwproces')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Ontwerp-en bouwproces</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
                                </View>
                                <Image style={styles.img} source={Arrow} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.day}>
                        <TouchableHighlight 
                            onPress={() => this.onPressModule('Communicatie')} 
                            underlayColor="white"
                        >
                            <View style={styles.item}>
                                <View style={styles.module}>
                                    <Text style={styles.title}>Communicatie</Text>
                                    <Text style={styles.subtitle}>
                                    Korte uitleg over deze module. 
                                    In één a twee zinnen waar het over gaat. 
                                    Dus het word maximaal zo groot als dit voorbeeld.
                                    </Text>
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
    img: {
        height: 23,
        width: 23,
        position: 'absolute',
        right: 12,
        top: 20,
        marginTop: 11,
    },
    line: {
        backgroundColor: '#C3C1C1',
        height: 0.5,
    },
    line2: {
        backgroundColor: '#C3C1C1',
        height: 0.5,
        marginHorizontal: 12,
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
    header: {
        backgroundColor: 'white',
        paddingVertical: 23.5,
        paddingLeft: 12,
    },
    headerText: {
        color: Colors.VBSBlue,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'open-sans-bold',
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
    time: {
        fontSize: 11,
        marginLeft: 12,
        marginTop: 11,
        fontFamily: 'open-sans-regular',
        color: Colors.VBSBlue,
        //flexGrow:1,
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
    module: {
        //backgroundColor: "green",
        //flexGrow: 2,
        marginLeft: 12,
        marginRight: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: 5,
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
