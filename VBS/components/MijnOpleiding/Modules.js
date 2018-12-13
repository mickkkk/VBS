import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  ListView,
} from 'react-native';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';

import { modulesFetch } from '../../actions';
import ModuleListItem from '../ModuleListItem';

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
    if (!this.state.fontLoaded) {
        return <AppLoading />;
        }
    return (
            <ListView
            style={styles.listview}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            />
    );
  }
}

const styles = StyleSheet.create({
    listview: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    const modules = _.map(state.modules, (val, uid) => {
        return { ...val, uid }; 
    });

    return { modules };
};

export default connect(mapStateToProps, { modulesFetch })(Modules);
