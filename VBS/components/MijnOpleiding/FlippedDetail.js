import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';

import Panel from './Panel';


const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

export default class Content extends React.Component {
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
    Actions.refresh({ title: this.props.flipped.titel });
  }

  
  render() {
    const { titel, auteur, beschrijving } = this.props.flipped;

    return (
      <ScrollView style={styles.container}>
        <Panel title="titel">
          <Text style={styles.body}>{titel}</Text>
        </Panel>
        <Panel title="auteur">
          <Text style={styles.body}>{auteur}</Text>
        </Panel>
        <Panel title="Beschrijving">
          <Text style={styles.body}>{beschrijving}</Text>
        </Panel>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: 10
    },
    body: {
      fontSize: 11,
      color: 'black',
      fontFamily: 'open-sans-regular'
  }
});
