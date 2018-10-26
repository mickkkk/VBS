import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import{ GiftedChat, Bubble, Actions } from 'react-native-gifted-chat';

import Fire from '../../Fire'
import Colors from '../../constants/Colors';
import CustomActions from './CustomActions';


class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {fontFamily:'open-sans-regular',fontSize:20,marginLeft:-30, marginRight:-30, textAlign: 'left',alignSelf:'center',color:Colors.VBSBlue},
            headerStyle:{
                backgroundColor:'white',
            },
        });

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
    }
    
    get user() {
        // Return our name and our UID for GiftedChat to parse
        return {
          name: 'Herman',
          _id: Fire.shared.uid,
          createdAt: new Date(),
          avatar: 'https://placeimg.com/140/140/any',
        };
      }

    get title() {
        return {
            
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

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
          return (
            <CustomActions
              {...props}
            />
          );
        }
        const options = {
          'Action 1': (props) => {
            alert('option 1');
          },
          'Action 2': (props) => {
            alert('option 2');
          },
          'Cancel': () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
      }

    renderBubble (props) {
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
        )
    }

    renderTime() {
        return (
            <Time
                textStyle={{
                    right: {
                        color: 'red',
                        fontFamily: 'Open-Sans-Regular',
                        fontSize: 14
                    },
                    left: {
                        color: 'red',
                        fontFamily: 'Open-Sans-Regular',
                        fontSize: 14
                    }
                }}
            />
        );
    }


    render() {
    return (
    <View style={{backgroundColor: 'white', flex:1}}>
        <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
        renderBubble={this.renderBubble}
        renderTime={this.renderTime.bind(this)}
        renderActions={this.renderCustomActions}
        />
    </View>
  );
  }
}

const styles = StyleSheet.create({

});

export default Chat;