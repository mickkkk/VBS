import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  ListView
} from 'react-native';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { flippedDelete, flippedReactieCreate, flippedReactieUpdate } from '../../actions';

import ReactieListItem from '../ReactieListItem';

import Colors from '../../constants/Colors';
import Panel from './Panel';
import Input from '../Input';
import Confirm from '../Confirm';

const ArrowReactie = require('../../assets/images/arrowReactie.png');

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

      <ScrollView style={styles.container}>
        <Panel title="Inhoud">
          <Text style={styles.body}>{inhoud}</Text>
        </Panel>
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
      </ScrollView>  
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F4F4F4',
  },
  body: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'open-sans-regular'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'flex-end',
    maxHeight: 20,
    marginRight: 10,
    marginBottom: 10,
    
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

}

});

const mapStateToProps = ({ flipped, auth }) => {
  const { reacties } = flipped;

  const { reactie } = flipped;

  const { email } = auth.user.user;

  return { reactie, reacties, email };
 };

export default connect(mapStateToProps, { 
  flippedDelete, 
  flippedReactieUpdate, 
  flippedReactieCreate })(FlippedDetail);
