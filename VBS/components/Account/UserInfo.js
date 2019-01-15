import React from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Colors from '../../constants/Colors';
import { updateUser } from '../../actions';
import Spinner from '../Spinner';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          fontLoaded: false,
          name: this.props.displayName,
          emailUser: (this.props.email) ? this.props.email : 'geen email bekend'
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
  }

  onButtonPress() {
    const userFirebase = firebase.auth().currentUser;
    console.log(this.state.name, this.state.emailUser, this.props.user);
    userFirebase.updateProfile({
        displayName: this.state.name
    }).then(() => {
        console.log('gebruikersnaam gewijzigd!');
        if (this.state.emailUser !== this.props.email || '') {
            userFirebase.updateEmail(this.state.emailUser).then(() => {
                console.log('email gewijzigd!');
                Alert.alert(
                    'Het is gelukt!',
                    'Je gegevens zijn opgeslagen',
                    [
                        { text: 'Ok', onPress: () => Actions.accountScreen() },
                    ]);
            });
        } else {
            Alert.alert(
                'Het is gelukt!',
                'Je gebruikersnaam is opgeslagen',
                [
                    { text: 'Ok', onPress: () => Actions.accountScreen() },
                ]);
        }
    });
}

  renderButton() {
    if (this.props.loading) {
        return <Spinner size="large" />;
    }

    return (
        <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
            <Text style={styles.textStyle}> 
                OPSLAAN
            </Text>
        </TouchableOpacity>
    );   
}
  
  render() {
    return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
        enabled
    >
        <View style={styles.box}>
            <View style={styles.row}>
                <Text style={styles.label}>Naam</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                    placeholder='Pieter Jansen'
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
            </View>
            <View style={styles.row2}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.emailUser}
                    onChangeText={(text) => this.setState({ emailUser: text })}
                    placeholder='Pieterjansen@hotmail.com'
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
            </View>
        </View>
        {this.renderButton()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        borderBottomWidth: 1,
        //paddingTop: 10,
        //backgroundColor: 'blue',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#707070',
        //position: 'relative',
        //maxWidth: 365
    },
    row2: {
        flex: 1,
        //paddingTop: 10,
        //backgroundColor: 'blue',
        justifyContent: 'space-between',
        flexDirection: 'row',
        //position: 'relative',
        //maxWidth: 365
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#F64404',
        borderRadius: 5,
        maxHeight: 35,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
        //marginTop: 38,
        //width: 269,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 13
    },
    label: {
        //flex: 1,
        //backgroundColor: 'green',
        maxWidth: 100,
        //marginLeft: 10,
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: 'open-sans-regular'
    },
    box: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        maxHeight: 107.5,
        flexDirection: 'column',
        borderWidth: 0.3,
        borderColor: '#C3C1C1',
    },
    input: {
        //maxWidth: 100,
        //flex: 1,
        //width: 50,
        //height: 50,
        color: '#000',
        //marginRight: 10,
        //paddingLeft: 5,
        fontSize: 14,
        fontFamily: 'open-sans-regular',
        //marginTop: -18,
        //lineHeight: 200,
        //flex: 2,
        alignSelf: 'center',
        //backgroundColor: 'red'
    },
    body: {
      fontSize: 11,
      color: 'black',
      fontFamily: 'open-sans-regular'
    },
    scrollview: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    tabbar: {
        flex: 1,
        marginTop: -15,
        backgroundColor: 'yellow'
    },
    tabview: {
        flex: 1,
        height: 600,
        backgroundColor: '#F4F4F4',
        marginTop: -15,
    },
});

const mapStateToProps = ({ auth }) => {
    const { email, displayName } = auth.user.user;
  
    const { user } = auth.user;
  
    return { email, displayName, user };
   };
  
  export default connect(mapStateToProps, { updateUser })(UserInfo);
