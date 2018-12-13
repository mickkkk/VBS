import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { Actions } from 'react-native-router-flux';
import { reactieUpdate, reactieCreate, reactiesFetch } from '../../actions';

import Panel from './Panel';
import Input from '../Input';

import ReactieListItem from '../ReactieListItem';
import Colors from '../../constants/Colors';

const ArrowReactie = require('../../assets/images/arrowReactie.png');

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');

class Content extends React.Component {
    constructor(props) {
      super(props);
      this.state = { fontLoaded: false };
    }

   componentWillMount() {
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
    const { introductie, lesstof, geluidsfragment, oefentoetsen } = this.props.module;
    return (
      <ScrollView style={styles.container}>
        <Panel title="Introductie">
          <Text style={styles.body}>{introductie}</Text>
        </Panel>
        <Panel title="Lesstof">
          <Text style={styles.body}>{lesstof}</Text>
        </Panel>
        <Panel title="Geluidsfragmenten">
          <Text style={styles.body}>{geluidsfragment}</Text>
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
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
            <Text style={styles.textStyle}> 
              <Image style={styles.img} source={ArrowReactie} />
            </Text>
            </TouchableOpacity>
          </View>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </Panel>
        <View style={{ marginBottom: 15 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingBottom: 10,
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
    width: 20,
    height: 20,

  }

});

const mapStateToProps = ({ modules, auth }) => {
  const { reacties } = modules;

  const { reactie } = modules;

  const { email } = auth.user.user;

  return { reactie, reacties, email };
 };

//export default Content;
export default connect(mapStateToProps, { reactiesFetch, reactieUpdate, reactieCreate })(Content);
