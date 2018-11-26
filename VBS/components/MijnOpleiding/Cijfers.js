import _ from 'lodash';
import React from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  View,
  ScrollView,
  Text
} from 'react-native';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';

import Panel from './Panel';

import { cijfersFetch } from '../../actions';
import CijferListItem from '../CijferListItem';
import Colors from '../../constants/Colors';

const OpenSansRegular = require('../../assets/fonts/OpenSans-Regular.ttf');
const OpenSansSemiBold = require('../../assets/fonts/OpenSans-SemiBold.ttf');


class Cijfers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  componentWillMount() {
      this.props.cijfersFetch(); 
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

 createDataSource({ cijfers }) {
     const ds = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
     });

     this.dataSource = ds.cloneWithRows(cijfers);
 }

renderRow(cijfer) {
    return <CijferListItem cijfer={cijfer} />;
}
 
  render() {
    if (!this.state.fontLoaded) {
        return <AppLoading />;
        }
    return (
    <View style={styles.container}>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        //keyExtractor={item => item.index}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    img: {
        height: 23,
        width: 23,
        position: 'absolute',
        right: 12,
        top: 20,
        marginTop: 11,
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
    day: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#C3C1C1',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        overflow: 'hidden',
        
        
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
        //justifyContent: 'space-between',
        paddingVertical: 20,
        //paddingHorizontal: 0,
    },
    time: {
        fontSize: 11,
        marginLeft: 12,
        marginTop: 11,
        fontFamily: 'open-sans-regular',
        color: Colors.VBSBlue,
        //flexGrow:1,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: Colors.VBSBlue,
    },
    subtitle: {
        fontFamily: 'open-sans-regular',
        fontSize: 11,
    },
    module: {
        //backgroundColor: "green",
        //flexGrow: 2,
        marginLeft: 12,
        marginRight: 30,
    },
    container: {
        flex: 1,
        //backgroundColor: 'red',
        paddingTop: 5,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
        ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        android: {
            elevation: 20,
        },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

const mapStateToProps = state => {
    console.log(state, 'mapstatetoprops cijfers');
    const cijfers = _.map(state.cijfers, (val, uid) => {
        return { ...val, uid }; 
    });

    return { cijfers };
};

export default connect(mapStateToProps, { cijfersFetch })(Cijfers);
