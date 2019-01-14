/* eslint-disable global-require */
import React from 'react';
import { 
  StyleSheet, 
  Font, 
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';
import Colors from '../constants/Colors';

import { logoutUser, reactieCreate } from '../actions';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');

const Arrow = require('../assets/images/arrow.png');

class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      fontLoaded: false,
      urlke: ''
    };
  }

  async componentWillMount() {
    switch (this.props.email) {
      case 'iris@vbs.com':
        this.setState({ urlke: require('../assets/images/accountIris.png') });
        break;
      case 'freek@vbs.com':
        this.setState({ urlke: require('../assets/images/accountFreek.png') });
        break;
      default:
        this.setState({ urlke: require('../assets/images/mickVranken.jpg') });
        break;
    }
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

  onInfoPress() {
    Actions.userInfo();
  }

  onPressWachtwoord() {
    Actions.wachtwoordScreen();
  }

  onPressLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Account" />
        <View style={styles.container}>
          <View>
          <View style={styles.info}>
            <View style={styles.pic}>
              <Image source={this.state.urlke} style={styles.img} />
            </View>
            <TouchableWithoutFeedback 
              onPress={this.onInfoPress.bind(this)} 
              underlayColor="white"
            >
              <View style={styles.infoText}>
                <Text style={styles.name}>{this.props.displayName}</Text>
                <Text style={styles.email}>{this.props.email}</Text>
              </View>
            </TouchableWithoutFeedback>
            </View>
            <View style={styles.instellingen}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Instellingen</Text>
                </View>
                <View style={styles.line} />
                <TouchableWithoutFeedback 
                onPress={this.onPressWachtwoord.bind(this)} 
                underlayColor="white"
                >
                <View style={styles.item}>
                    <Text style={styles.teacher}>Wachtwoord wijzigen</Text>
                    <Image style={styles.arrow} source={Arrow} />
                </View>
              </TouchableWithoutFeedback>
                
                <View style={styles.line2} />
                <View style={styles.item}>
                    <Text style={styles.teacher}>Adressen</Text>
                    <Image style={styles.arrow} source={Arrow} />
                </View>
                <View style={styles.line2} />
                <View style={styles.item}>
                    <Text style={styles.teacher}>Beschikbaarheid</Text>
                    <Image style={styles.arrow} source={Arrow} />
                </View>
                <View style={styles.line2} />
                <View style={styles.item}>
                    <Text style={styles.teacher}>Notificaties</Text>
                    <Text style={styles.toggle}>AAN</Text>
                </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.onPressLogout.bind(this)} style={styles.buttonStyle}>
            <Text style={styles.textStyleBtn}> 
              UITLOGGEN 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: Colors.VBSBlue,
    maxHeight: 38,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    fontFamily: 'open-sans-regular',
    fontSize: 14,
  },
  instellingen: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#C3C1C1',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    overflow: 'hidden',
  },
  line: {
    backgroundColor: '#C3C1C1',
    height: 0.5,
  },
  line2: {
    backgroundColor: '#C3C1C1',
    height: 0.5,
    marginHorizontal: 12,
  },
  textStyleBtn: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 17,
    fontFamily: 'open-sans-regular',
  },
  rooster: {
    fontSize: 20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft: 0,
    color: Colors.VBSBlue,
    textAlign: 'center',
  },
  arrow: {
    height: 23,
    width: 23,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    right: 12,
  },
  toggle: {
    height: 23,
    //width: 23,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    right: 12,
    color: Colors.VBSBlue
  },
  img: {
    height: 70,
    width: 70,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.VBSBlue,
  },
  pic: {
    flex: 1,
    maxWidth: 105,
    justifyContent: 'center',
  },
  infoText: {
    flex: 2,
    justifyContent: 'center'
  },
  name: {
    fontSize: 20,
    color: Colors.VBSBlue,
    fontFamily: 'open-sans-regular'
  },
  info: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    paddingLeft: -5,
    height: 90,
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: '#C3C1C1',
  },
  email: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'open-sans-regular'
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 23.5,
    paddingLeft: 12,
  },
  headerText: {
      color: Colors.VBSBlue,
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'open-sans-bold',
  },
  item: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 24,
    marginLeft: 12,
},
});

const mapStateToProps = ({ auth }) => {
  const { email, displayName } = auth.user.user;

  const { user } = auth.user;

  return { email, displayName, user };
 };

export default connect(mapStateToProps, { reactieCreate, logoutUser })(AccountScreen);
/* eslint-enable global-require */
