import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Colors from '../constants/Colors';

const Arrow = require('../assets/images/arrow.png');


class FlippedListItem extends Component {
    onRowPress() {
        Actions.flippedDetail({ flipped: this.props.flipped, uidModule: this.props.uid });
    }

    render() {
        const { auteur, titel, beschrijving } = this.props.flipped;
        return (
            <View style={styles.day}>
                <TouchableWithoutFeedback 
                    onPress={this.onRowPress.bind(this)} 
                    underlayColor="white"
                >
                    <View style={styles.item}>
                        <View style={styles.module}>
                            <Text style={styles.title}>{titel}</Text>
                            <Text style={styles.subtitle}>{auteur}</Text>
                            <Text style={styles.body}>{beschrijving}</Text>
                        </View>
                        <Image style={styles.img} source={Arrow} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 23,
        width: 23,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        right: 12,
        //top: 20,
        //marginTop: 11,
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
        paddingVertical: 20,
    },
    time: {
        fontSize: 11,
        marginLeft: 12,
        marginTop: 11,
        fontFamily: 'open-sans-regular',
        color: Colors.VBSBlue,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: Colors.VBSBlue,
    },
    subtitle: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
        color: Colors.VBSBlue,
    },
    body: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
    },
    module: {
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

export default FlippedListItem;
