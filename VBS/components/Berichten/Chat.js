/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';

import { GiftedChat, Bubble, Actions } from 'react-native-gifted-chat';


import Fire from '../../Fire';
import Colors from '../../constants/Colors';
import CustomActions from './CustomActions';


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            urlke: ''
        };
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
    }

    async componentWillMount() {
        switch (this.props.email) {
          case 'iris@vbs.com':
            this.setState({ urlke: require('../../assets/images/accountIris.png') });
            break;
          case 'freek@vbs.com':
            this.setState({ urlke: require('../../assets/images/accountFreek.png') });
            break;
          default:
            this.setState({ urlke: require('../../assets/images/mickVranken.jpg') });
            break;
        }
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

    get user() {
        // Return our name and our UID for GiftedChat to parse
        const { email } = this.props;
        return {
          name: email,
          _id: Fire.shared.uid,
          createdAt: new Date(),
          avatar: this.state.urlke,
        };
    }

    get title() {
        return {
            
        };
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
          return (
            <CustomActions
              {...props}
            />
          );
        }
        const options = {
          'Action 1': () => {
            Alert('option 1');
          },
          'Action 2': () => {
            Alert('option 2');
          },
          Cancel: () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
      }

    renderBubble(props) {
        return (
        <Bubble 
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: Colors.VBSBlue
                },
                left: {
                    backgroundColor: '#ADB4BF'
                }
            }}
            textProps={{
                style: {
                    color: 'white'
                },
            }}
        />
        );
    }

    render() {
    return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
        <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
        renderBubble={this.renderBubble}
        renderActions={this.renderCustomActions}
        />
    </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
    const { email } = auth.user.user;
  
    return { email };
   };

export default connect(mapStateToProps, { })(Chat);
/* eslint-enable global-require */
