import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  ListView,
  TouchableWithoutFeedback
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { flippedLikeUpdate, flippedDelete, flippedReactieCreate, flippedReactieUpdate } from '../../actions';

import ReactieListItem from '../ReactieListItem';

import Colors from '../../constants/Colors';
import Panel from './Panel';
import Input from '../Input';
import Confirm from '../Confirm';

const ArrowReactie = require('../../assets/images/arrowReactie.png');
const Like = require('../../assets/images/like.png');
const LikeBlue = require('../../assets/images/like_blue.png');

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

class FlippedDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        fontLoaded: false,
        showModal: false,
        likedState: this.props.liked || false,
        likesCount: this.props.flipped.liked,
      };
    }

  componentWillMount() {
    this.createDataSource(this.props.flipped);
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

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.flipped);
 }

  onAccept() {
    const uidFlipped = this.props.flipped.uid;
    const uidModule = this.props.uidModule;
    
    this.props.flippedDelete({ uidModule, uidFlipped });
  }
  

  onDecline() {
    this.setState({ showModal: false });
  }

  onPressLike() {
    let val = this.props.flipped.liked;
    let isLiked = false;
    const uidModule = this.props.uidModule;
    const uidFlipped = this.props.flipped.uid;
    if (this.state.likedState) {
      val = this.props.flipped.liked;
      this.setState({ likedState: !this.state.likedState });
      this.setState({ likesCount: this.props.flipped.liked });
      //this.setState({ likes: this.state.likes -1 });
      this.props.flippedLikeUpdate({ uidModule, uidFlipped, val, isLiked });
    } else {
      val = this.props.flipped.liked + 1;
      isLiked = true;
      this.setState({ likedState: !this.state.likedState });
      this.setState({ likesCount: this.props.flipped.liked + 1 });
      this.props.flippedLikeUpdate({ uidModule, uidFlipped, val, isLiked });
    }
  }

  onButtonPress() {
    const { reactie, email } = this.props;
    const { uidModule } = this.props;
    const { uid } = this.props.flipped;

    const naam = email;
 
    this.props.flippedReactieCreate({ naam, reactie, uidModule, uid });
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
    const { inhoud } = this.props.flipped;

    return (
      <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => this.setState({ showModal: !this.state.showModal })} 
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}> 
            VERWIJDER ARTIKEL
        </Text>
      </TouchableOpacity>

      <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      //contentContainerStyle={styles.container}
      scrollEnabled
      >
      <View style={styles.containerInhoud}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Inhoud</Text>
            <TouchableWithoutFeedback 
              onPress={this.onPressLike.bind(this)} 
              underlayColor="white"
            >
                <Image style={styles.like} source={(this.state.likedState) ? LikeBlue : Like} />
            </TouchableWithoutFeedback>
            <View style={styles.count}>
              <Text style={styles.countNumber}>{(this.state.likesCount !== 0) ? this.state.likesCount : ''}</Text>
            </View>
        </View>
        <View>
          <View style={styles.line} />
            <View style={styles.inhoud}>
                <Text style={styles.body}>{inhoud}</Text>
            </View>
          </View>
        </View>
        <Panel title="Reacties">
        <View style={styles.reactiesStyle}>
            <Input
                placeholder="Typ een bericht..."
                style={styles.input}
                placeholderTextColor="#707070"
                onChangeText={
                  value => this.props.flippedReactieUpdate({ prop: 'reactie', value })
                }
                value={this.props.reactie}
            />
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyleReactie}>
            <Text style={styles.textStyleReactie}> 
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
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Wilt u dit artikel verwijderen?
        </Confirm>
        </KeyboardAwareScrollView>  
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F4F4F4',
  },
  containerInhoud: {
    marginTop: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#C3C1C1',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
  },
  body: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'open-sans-regular'
    //padding: 10,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'flex-end',
    maxHeight: 20,
    marginRight: 10,
    marginBottom: 10,
    
},
inhoud: {
  padding: 10
},
buttonStyleReactie: {
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
textStyleReactie: {
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
textStyle: {
    alignSelf: 'center',
    color: Colors.VBSBlue,
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 13
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
titleContainer: {
  flexDirection: 'row',
  height: 58.5,
  alignItems: 'center'
},
title: {
  flex: 1,
  padding: 10,
  fontSize: 14,
  color: Colors.VBSBlue,
  fontFamily: 'open-sans-bold'
},
like: {
  height: 20,
  width: 20,
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  right: 15,
  top: 0,
  marginTop: 0,
},

count: {
  height: 20,
  width: 20,
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  right: 5,
  top: 0,
  marginTop: 0,
},
countNumber: {
  fontSize: 14,
  color: Colors.VBSBlue
},
line: {
  backgroundColor: '#C3C1C1',
  height: 0.5,
},

});

const mapStateToProps = ({ flipped, auth }) => {
  const { reacties, reactie, liked } = flipped;

  //const {  } = flipped;

  const { email } = auth.user.user;

  return { reactie, reacties, liked, email };
 };

export default connect(mapStateToProps, { 
  flippedDelete, 
  flippedReactieUpdate, 
  flippedReactieCreate,
  flippedLikeUpdate })(FlippedDetail);
