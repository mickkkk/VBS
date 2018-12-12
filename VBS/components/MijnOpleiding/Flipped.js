import _ from 'lodash';
import React from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { flippedFetch, flippedCreate } from '../../actions';
import FlippedListItem from '../FlippedListItem';
import Colors from '../../constants/Colors';
import Button from '../Button';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');


class Flipped extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        fontLoaded: false,
        uid: this.props.module.uid,
    };
  }

  componentWillMount() {
      this.props.flippedFetch(this.props.module.uid);

      this.createDataSource(this.props);
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

 componentWillReceiveProps(nextProps) {
     this.createDataSource(nextProps);
     console.log(nextProps, 'this.props nextprops flipped');
 }

 onButtonPress() {
    const { uid } = this.props.module;
    console.log(uid, 'btnPressuid');

    Actions.flippedCreate({ uid });
 }

 createDataSource({ flipped }) {
     const ds = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
     });

     this.dataSource = ds.cloneWithRows(flipped);
 }
 
renderRow(flipped) {   
    console.log(flipped, 'props flipped renderRow');
    const { uid } = this.props.module;
    console.log(uid, 'uid render row');
    return <FlippedListItem flipped={flipped} uid={uid} />;
}
 
  render() {
    if (!this.state.fontLoaded) {
        return <AppLoading />;
        }
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonStyle}>
            <Text style={styles.textStyle}> 
                VOEG ARTIKEL TOE
            </Text>
        </TouchableOpacity>
                <ListView
                style={styles.listview}
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
                //keyExtractor={item => item.index}
                />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    listview: {
        //flex: 1,
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        //paddingTop: 5,
    },
    buttonStyle: {
        flex: 1,
        //alignSelf: 'stretch',
        //backgroundColor: '#F64404',
        alignSelf: 'flex-end',
        //borderRadius: 5,
        maxHeight: 20,
        marginRight: 10,
        marginBottom: 10,
        //width: 269,
        
    },
    textStyle: {
        alignSelf: 'center',
        color: Colors.VBSBlue,
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 13
    }
});

const mapStateToProps = state => {
    const flipped = _.map(state.flipped, (val, uid) => {
        return { ...val, uid }; 
    });

    flipped.reverse();

    const { titel, auteur, beschrijving } = state.flipped;

    return { flipped, titel, auteur, beschrijving };
};

export default connect(mapStateToProps, { flippedFetch, flippedCreate })(Flipped);
