import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { flippedDelete } from '../../actions';

import Panel from './Panel';
import Button from '../Button';
import Confirm from '../Confirm';
import CardSection from '../CardSection';


const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

class FlippedDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        fontLoaded: false,
        showModal: false
      };
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

  onAccept() {
    const uidFlipped = this.props.flipped.uid;
    const uidModule = this.props.uid;
    
    this.props.flippedDelete({ uidModule, uidFlipped });
  }

  onDecline() {
    this.setState({ showModal: false });
  }
  
  render() {
    const { auteur, beschrijving, inhoud } = this.props.flipped;

    return (
    <ScrollView style={styles.container}>
      <Panel title="Inhoud">
        <Text style={styles.body}>{inhoud}</Text>
      </Panel>
      <Panel title="Auteur">
        <Text style={styles.body}>{auteur}</Text>
      </Panel>
      <Panel title="Beschrijving">
        <Text style={styles.body}>{beschrijving}</Text>
      </Panel>
      
      <CardSection>
        <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
          Verwijder Artikel
        </Button>
      </CardSection>
      <Confirm
        visible={this.state.showModal}
        onAccept={this.onAccept.bind(this)}
        onDecline={this.onDecline.bind(this)}
      >
        Weet je zeker dat je dit artikel wilt verwijderen?
      </Confirm>
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

export default connect(null, { flippedDelete })(FlippedDetail);
