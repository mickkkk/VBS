/* eslint-disable prefer-const */
import React, { Component } from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableHighlight, 
    Animated } from 'react-native';
import { Font } from 'expo';

import Colors from '../../constants/Colors';

const ArrowUp = require('../../assets/images/arrow_up.png');
const ArrowDown = require('../../assets/images/arrow_down.png');
const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');
const OpenSansBold = require('../../assets/fonts/OpenSans-Bold.ttf');


class Panel extends Component {
    constructor(props) {
        super(props);

        this.icons = {
            up: ArrowUp,
            down: ArrowDown
        };

        this.state = {
            title: props.title,
            expanded: false,
            animation: new Animated.Value(),
            maxHeight: null,
            minHeight: null
        };
    }

    async componentDidMount() {
        try {
          await Font.loadAsync({
            'open-sans-regular': OpenSansRegular,
            'open-sans-semi-bold': OpenSansSemiBold,
            'open-sans-bold': OpenSansBold,
          });
          this.setState({ fontLoaded: true });
        } catch (error) {
          console.log(error);
        }
      }

    setMaxHeight(event) {
        if (!this.state.maxHeight) {
            this.setState({
            maxHeight: event.nativeEvent.layout.height,
            });
        }
    }
    
    setMinHeight(event) {
        if (!this.state.minHeight) {
            this.setState({
                minHeight: event.nativeEvent.layout.height,
                animation: new Animated.Value(event.nativeEvent.layout.height),
          });
        }
    }

    toggle() {
        let initialValue = 
            this.state.expanded ? this.state.maxHeight + this.state.minHeight 
            : this.state.minHeight;
        let finalValue = 
            this.state.expanded ? this.state.minHeight 
            : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    render() {
        let icon = this.icons.down;

        if (this.state.expanded) {
            icon = this.icons.up;
        }

        return ( 
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
                <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#fff"
                >
                    <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Image style={styles.img} source={icon} />
                    </View>
                </TouchableHighlight>
                
                <View onLayout={this.setMaxHeight.bind(this)}>
                    <View style={styles.line} />
                    <View style={styles.body}>
                        {this.props.children}
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#C3C1C1',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
    },
    line: {
        backgroundColor: '#C3C1C1',
        height: 0.5,
    },
    titleContainer: {
        flexDirection: 'row',
        height: 58.5,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        padding: 10,
        fontSize: 14,
        color: Colors.VBSBlue,
        fontFamily: 'open-sans-bold'
    },
    img: {
        height: 30,
        width: 30,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        right: 10,
        top: 0,
        marginTop: 0,
    },
    body: {
        padding: 10,
    }

});

export default Panel;
