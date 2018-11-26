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
    Actions.refresh({ title: this.props.module.titel });
  }

  
  render() {
    const { introductie, lesstof, geluidsfragment, oefentoetsen, reacties } = this.props.module;

    return (
      <ScrollView style={styles.container}>
        <Panel title="Introductie">
          <Text style={styles.body}>{introductie}</Text>
        </Panel>
        <Panel title="Lesstof">
          <Text style={styles.body}>{lesstof}</Text>
        </Panel>
        <Panel title="Geluidsfragmenten">
          <Text style={styles.body}>{geluidsfragment}</Text>
        </Panel>
        <Panel title="Oefentoetsen">
          <Text style={styles.body}>{oefentoetsen.oefentoets1.vraag1}</Text>
        </Panel>
        <Panel title="Reacties">
          <Text style={styles.body}>{reacties.reactie1.naam}</Text>
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
