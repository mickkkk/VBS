import React from 'react';
//import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Font, Video, Audio } from 'expo';
import { Actions } from 'react-native-router-flux';
import { MaterialIcons } from '@expo/vector-icons';
//import Video from 'react-native-video';
import { reactieUpdate, reactieCreate, reactiesFetch } from '../../actions';


import Panel from './Panel';
import Input from '../Input';

import ReactieListItem from '../ReactieListItem';
import Colors from '../../constants/Colors';

const ArrowReactie = require('../../assets/images/arrowReactie.png');

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');
const mp4 = require('../../assets/mp4/sample.mp4');
const mp3 = require('../../assets/mp3/sound1.mp3');


class Content extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        fontLoaded: false,
        mute: false,
        fullScreen: false,
        shouldPlay: false,
        playAudio: false,
       };
       //const audioPlayer1 = null;
    }

   componentWillMount() {
    console.log(this.state.reacties, 'state reacties');
    this.createDataSource(this.props.module);
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
    this.createDataSource(this.props.module);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.module);
  }
  onButtonPress() {
   const { reactie, email } = this.props;
   const { uid } = this.props.module;

   const naam = email;

   this.props.reactieCreate({ naam, reactie, uid });
   this.props.reactiesFetch({ uid });
 }

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay
    }));
  }

  async handlePlayAndPauseAudio() {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(mp3);
    if (this.state.playAudio) {
      try {
        await this.audioPlayer1.pauseAsync();
        this.setState(prevState => ({
          playAudio: !prevState.playAudio
      }));
      } catch (error) {
        console.error(error);
      }
    } else {
    try {
      this.audioPlayer1 = soundObject;
      this.audioPlayer1.playAsync();

      this.setState(prevState => ({
          playAudio: !prevState.playAudio
      }));
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  }

  createDataSource({ reacties }) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(reacties);
  }

  renderRow(reactie) {
    return <ReactieListItem reactie={reactie} />;
  }

  render() {
    const { lesstof, oefentoetsen } = this.props.module;
    return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      //contentContainerStyle={styles.container}
      scrollEnabled
    >
            <Panel title="Introductie">
              <Video
                source={mp4}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={this.state.shouldPlay}
                isLooping
                //style={{ width, height: 180 }}
                style={{ width: 340, height: 180 }}
              />
              <View style={styles.controlBar}> 
							<MaterialIcons 
								name={this.state.shouldPlay ? 'pause' : 'play-arrow'} 
								size={40} 
								color="white" 
								onPress={this.handlePlayAndPause} 
							/>
              <MaterialIcons 
								name={this.state.mute ? 'volume-mute' : 'volume-up'}
								size={30} 
								color="white" 
                onPress={this.handleVolume}
              />
						</View>
            </Panel>
            <Panel title="Lesstof">
              <Text style={styles.body}>{lesstof}</Text>
            </Panel>
            <Panel title="Geluidsfragmenten">
              
                <MaterialIcons 
                  name={this.state.playAudio ? 'pause' : 'play-arrow'} 
                  size={40} 
                  color={Colors.VBSBlue} 
                  onPress={this.handlePlayAndPauseAudio.bind(this)} 
                />
                
            </Panel>
            <Panel title="Oefentoetsen">
              <Text style={styles.body}>{oefentoetsen.oefentoets1.vraag1}</Text>
            </Panel>
            <Panel title="Reacties">
              <View style={styles.reactiesStyle}>
                <Input
                    placeholder="Typ een bericht..."
                    style={styles.input}
                    placeholderTextColor="#707070"
                    onChangeText={
                      value => this.props.reactieUpdate({ prop: 'reactie', value })
                    }
                    value={this.props.reactie}
                />
                <TouchableOpacity 
                  onPress={this.onButtonPress.bind(this)} 
                  style={styles.buttonStyle}
                >
                <Text style={styles.textStyle}> 
                  <Image style={styles.img} source={ArrowReactie} />
                </Text>
                </TouchableOpacity>
              </View>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                removeClippedSubviews={false}
              />
            </Panel>
            <View style={{ marginBottom: 15 }} />
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  audio: {
    backgroundColor: 'green',
    width: 20,
    height: 20
  },
  buttonStyle: {
    flex: 1,
    //alignSelf: 'stretch',
    //alignItems: 'center',
    //flexDirection: 'column',
    //justifyContent: 'center',
    backgroundColor: Colors.VBSBlue,
    borderRadius: 100,
    maxHeight: 30,
    maxWidth: 30,
    marginTop: 38,
    paddingTop: 3,
    paddingLeft: 3,
    //width: 30,
    
},
  reactiesStyle: {
    //borderBottomWidth: 1,
    marginTop: -30,
    //backgroundColor: 'transparent',
    alignItems: 'baseline',
    flexDirection: 'row',
    //borderColor: '#fff',
    position: 'relative',
    justifyContent: 'space-between',
    //maxWidth: 269
  }, 
  textStyle: {
    //alignSelf: 'center',
    //color: Colors.VBSBlue,
    //fontSize: 12,
    //fontWeight: '600',
    marginTop: 7,
    marginLeft: 6,
    paddingBottom: 5,
    //alignSelf: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
},
  container: {
    marginBottom: 10,
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 10,
    paddingBottom: 10
  },
  body: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'open-sans-regular'
  },
  input: {
    flex: 1,
    height: 30,
    maxWidth: 290,
    borderRadius: 3,
    borderColor: '#b2b2b2',
    borderWidth: 0.5,
  },
  img: {
    paddingTop: 5,
    paddingLeft: 5,
    width: 15,
    height: 15,
  },
  controlBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 13,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	}

});

const mapStateToProps = ({ modules, auth }) => {
  const { reacties } = modules;
  const { reactie } = modules;
  const { email } = auth.user.user;

  return { reactie, reacties, email };
 };

export default connect(mapStateToProps, { reactiesFetch, reactieUpdate, reactieCreate })(Content);
