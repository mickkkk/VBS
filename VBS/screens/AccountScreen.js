/* eslint-disable global-require */
import React from 'react';
import { 
  StyleSheet, 
  Font, 
  View,
  Text,
  Image,
  TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Colors from '../constants/Colors';

import { logoutUser, reactieCreate } from '../actions';

const OpenSansRegular = require('../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../assets/fonts/OpenSans-SemiBold.ttf');

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

  onPressLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Account" />
        <View style={styles.container}>
          <View style={styles.info}>
            <View style={styles.pic}>
              <Image source={this.state.urlke} style={styles.img} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.name}>{this.props.displayName}</Text>
              <Text style={styles.email}>{this.props.email}</Text>
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
  },
  textStyleBtn: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 13
  },
  rooster: {
    fontSize: 20, 
    fontFamily: 'open-sans-semi-bold',
    marginLeft: 0,
    color: Colors.VBSBlue,
    textAlign: 'center',
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
    //backgroundColor: 'red',
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
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
});

const mapStateToProps = ({ auth }) => {
  const { email, displayName, photoURL } = auth.user.user;

  const { user } = auth.user;

  return { email, displayName, photoURL, user };
 };

export default connect(mapStateToProps, { reactieCreate, logoutUser })(AccountScreen);
/* eslint-enable global-require */
