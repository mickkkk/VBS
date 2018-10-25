import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import{ GiftedChat } from 'react-native-gifted-chat';

import Fire from '../../Fire'


class Chat extends Component {
    

    state = {
        messages: [],
      };
    
    get user() {
        // Return our name and our UID for GiftedChat to parse
        return {
          name: 'Test',
          _id: Fire.shared.uid,
        };
      }

    componentDidMount() {
    Fire.shared.on(message =>
        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        }))
    );
    }
    componentWillUnmount() {
      Fire.shared.off();
    }

    render() {
    return (
        <GiftedChat
        style={backgroundColor= 'red'}
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
    />
  );
  }
}

const styles = StyleSheet.create({

});

export default Chat;