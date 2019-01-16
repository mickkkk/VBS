import React from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Alert
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { updateUser } from '../../actions';
import Spinner from '../Spinner';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

const Eye = require('../../assets/images/eye.png');

class WachtwoordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPressEye.bind(this);
        this.reauthenticate.bind(this);
        this.state = { 
            fontLoaded: false,
            huidig: '',
            nieuw: '',
            herhaal: '',
            secureHuidig: true,
            secureNieuw: true,
            secureHerhaal: true,
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

  onPressEye(eye) {
      switch (eye) {
        case 'huidig':
            this.setState({ secureHuidig: !this.state.secureHuidig });
            break;
        case 'nieuw':
            this.setState({ secureNieuw: !this.state.secureNieuw });
            break;
        case 'herhaal':
            this.setState({ secureHerhaal: !this.state.secureHerhaal });
            break;
        default:
            console.log('geen eye gewijzigd');
            break;
      }
  }

  onButtonPress() {    
    this.reauthenticate().then(() => {
        const userFirebase = firebase.auth().currentUser;
        if (this.state.nieuw === this.state.herhaal) {
            userFirebase.updatePassword(this.state.nieuw).then(() => {
                     Alert.alert(
                         'Het is gelukt!',
                         'Je wachtwoord is gewijzigd',
                         [
                             { text: 'Ok', onPress: () => Actions.accountScreen() },
                         ]);
                 }).catch((error) => { 
                    console.log(error); 
                });
        } else {
            Alert.alert(
                'Oops!',
                'Het veld `Nieuw wachtwoord`en `Herhaal nieuw wachtwoord` komen niet overeen.',
                [
                    { text: 'Ok' },
                ]);
        }
    }).catch(() => {
        Alert.alert(
            'Oops!',
            'Je huidig wachtwoord is onjuist',
            [
                { text: 'Ok' },
            ]);
    });
}

    reauthenticate = () => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(
        this.props.email, this.state.huidig);
        return user.reauthenticateAndRetrieveDataWithCredential(cred);
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
                <TextInput
                    secureTextEntry={this.state.secureHuidig}
                    style={styles.input}
                    onChangeText={(text) => this.setState({ huidig: text })}
                    placeholder='Huidig wachtwoord'
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
                <TouchableWithoutFeedback 
                onPress={() => this.onPressEye('huidig')} 
                underlayColor="white"
                >
                    <Image style={styles.eye} source={Eye} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.row}>
                <TextInput
                    secureTextEntry={this.state.secureNieuw}
                    style={styles.input}
                    //value={this.state.emailUser}
                    onChangeText={(text) => this.setState({ nieuw: text })}
                    placeholder='Nieuw wachtwoord'
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
                <TouchableWithoutFeedback 
                onPress={() => this.onPressEye('nieuw')} 
                underlayColor="white"
                >
                    <Image style={styles.eye} source={Eye} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.row2}>
                <TextInput
                    secureTextEntry={this.state.secureHerhaal}
                    style={styles.input}
                    //value={this.state.emailUser}
                    onChangeText={(text) => this.setState({ herhaal: text })}
                    placeholder='Herhaal nieuw wachtwoord'
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                />
                <TouchableWithoutFeedback 
                onPress={() => this.onPressEye('herhaal')} 
                underlayColor="white"
                >
                    <Image style={styles.eye} source={Eye} />
                </TouchableWithoutFeedback>
                
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#707070',
    },
    row2: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#F64404',
        borderRadius: 5,
        maxHeight: 35,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
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
        maxWidth: 100,
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
        maxHeight: 160.5,
        flexDirection: 'column',
        borderWidth: 0.3,
        borderColor: '#C3C1C1',
    },
    input: {
        flex: 1,
        color: '#000',
        fontSize: 14,
        fontFamily: 'open-sans-regular',
        alignSelf: 'center',
    },
    eye: {
        height: 13,
        width: 22,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        right: 12,
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
    const { email, displayName, password } = auth.user.user;
  
    const { user } = auth.user;
  
    return { email, displayName, user, password };
   };
  
  export default connect(mapStateToProps, { updateUser })(WachtwoordScreen);
