import React, { Component } from 'react';
import { Text, StyleSheet, Platform, View } from 'react-native';
import Colors from '../constants/Colors';

import Panel from './MijnOpleiding/Panel';

class ReactieListItem extends Component {
    render() {
        const { naam, reactie } = this.props.reactie;
        return (
        <View>
            <View style={styles.container}>
                <Text style={styles.naam}>{naam}</Text>
                <Text style={styles.reactie}>{reactie}</Text>
            </View>
            <View style={styles.line2} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    line2: {
        backgroundColor: '#C3C1C1',
        height: 0.5,
    },
    naam: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        color: Colors.VBSBlue
    },
    reactie: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
    }
});

export default ReactieListItem;
