import _ from 'lodash';
import React from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  View,
  ScrollView
} from 'react-native';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';

import { modulesFetch } from '../../actions';
import ModuleListItem from '../ModuleListItem';
import Colors from '../../constants/Colors';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');


class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  componentWillMount() {
      this.props.modulesFetch();

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
 }

 createDataSource({ modules }) {
     const ds = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
     });

     this.dataSource = ds.cloneWithRows(modules);
 }

renderRow(module) {    
    return <ModuleListItem module={module} />;
}
 
  render() {
    console.log(this.props, 'props module');
    if (!this.state.fontLoaded) {
        return <AppLoading />;
        }
    return (
            <ListView
            style={styles.listview}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            //keyExtractor={item => item.index}
            />
    );
  }
}

const styles = StyleSheet.create({
    listview: {
        flex: 1,
        //backgroundColor: 'red',
        //paddingTop: 5,
    }
});

const mapStateToProps = state => {
    console.log(state, 'mapstatetoprops modules');
    const modules = _.map(state.modules, (val, uid) => {
        return { ...val, uid }; 
    });

    return { modules };
};

export default connect(mapStateToProps, { modulesFetch })(Modules);
