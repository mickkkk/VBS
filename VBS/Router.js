import React from 'react';
import { Platform, Image } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import LoginForm from './components/LoginForm';
import RoosterScreen from './screens/RoosterScreen';
import Chat from './components/Berichten/Chat';
import BerichtenScreen from './screens/BerichtenScreen';
import MijnOpleidingScreen from './screens/MijnOpleidingScreen';
import ModuleDetail from './components/MijnOpleiding/ModuleDetail';
import FlippedDetail from './components/MijnOpleiding/FlippedDetail';
import FlippedCreate from './components/MijnOpleiding/FlippedCreate';
import AccountScreen from './screens/AccountScreen';
import UserInfo from './components/Account/UserInfo';

import Colors from './constants/Colors';
import TabBarIcon from './components/TabBarIcon';

const VBSLogo = require('./assets/images/vbs.png');
const VBSLogoUnfocused = require('./assets/images/vbs_unfocused.png');


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar >
                <Stack key="auth" hideNavBar>
                    <Scene key="login" component={LoginForm} title="login" />
                </Stack>
                <Stack key="main" tabs >
                    <Scene 
                        key="rooster" 
                        component={RoosterScreen} 
                        hideNavBar 
                        title="Rooster"
                        activeTintColor='green'
                        icon={({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              name={Platform.OS === 'ios' ? 'md-calendar' : 'md-information-circle'}
                            />
                          )
                        }
                    />
                    <Stack 
                        key="berichten" 
                        title="Berichten"
                        icon={
                            ({ focused }) => (
                                <MaterialIcons
                                  focused={focused}
                                  size={30}
                                  name={
                                    Platform.OS === 'ios'
                                      ? `chat-bubble${focused ? '-outline' : '-outline'}`
                                      : 'md-link'
                                  }
                                  color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                                />
                              )
                        }
                    >
                        <Scene 
                            key="berichtenScreen" 
                            component={BerichtenScreen} 
                            hideNavBar
                        />
                        <Scene 
                            key="chat" 
                            component={Chat} 
                            title="Klas N21"
                            backButtonTintColor={Colors.VBSBlue}
                            backButtonTextStyle={{ }}
                        />
                    </Stack>
                    <Stack 
                        key="mijnOpleiding" 
                        title="Mijn Opleiding"
                        icon={ 
                            // eslint-disable-next-line no-confusing-arrow
                            ({ focused }) =>
                                focused ? (
                                <Image
                                    focused={focused}
                                    style={{
                                    height: 30,
                                    width: 25
                                    }}
                                    source={VBSLogo}
                                />
                            ) : (
                            <Image
                                focused={focused}
                                style={{
                                height: 30,
                                width: 25
                                }}
                                source={VBSLogoUnfocused}
                            />
                         )
                        }
                    >
                        <Scene 
                            //rightTitle="Filter"
                            //onRight={() => { console.log('right title tapped') }}
                            key="modules" 
                            component={MijnOpleidingScreen}
                            hideNavBar
                        />
                        <Scene 
                            //rightTitle="+"
                            //onRight={() => { Actions.flippedCreate(); }}
                            key="moduleDetail" 
                            component={ModuleDetail} 
                            title="Detail"
                            backButtonTintColor={Colors.VBSBlue}
                            headerBackTitle={'res'}
                            navigationBarStyle={{ borderBottomColor: 'transparent' }}
                            backButtonTextStyle={{ }}
                        />
                        <Scene 
                            key="flippedDetail" 
                            component={FlippedDetail} 
                            title="Detail"
                            backButtonTintColor={Colors.VBSBlue}
                            headerBackTitle={'res'}
                            navigationBarStyle={{ borderBottomColor: 'transparent' }}
                            backButtonTextStyle={{ }}
                        />
                        <Scene 
                            key="flippedCreate" 
                            component={FlippedCreate} 
                            title="Voeg artikel toe"
                            backButtonTintColor={Colors.VBSBlue}
                            headerBackTitle={'res'}
                            navigationBarStyle={{ borderBottomColor: 'transparent' }}
                            backButtonTextStyle={{ }}
                        />
                    </Stack>

                    <Stack 
                        key="account" 
                        title="Account"
                        icon={
                            ({ focused }) => (
                                <MaterialCommunityIcons
                                  focused={focused}
                                  size={35}
                                  name={
                                    Platform.OS === 'ios'
                                      ? `account${focused ? '-outline' : '-outline'}`
                                      : 'md-link'
                                  }
                                  color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                                />
                            )
                        }
                    >
                        <Scene 
                            key="accountScreen"
                            component={AccountScreen}
                            hideNavBar 
                            //backButtonTintColor={Colors.VBSBlue}
                            //headerBackTitle={'res'}
                            //navigationBarStyle={{ borderBottomColor: 'transparent' }}
                            //backButtonTextStyle={{ }}
                        />
                        <Scene 
                            key="userInfo" 
                            component={UserInfo} 
                            title="Gebruikersgegevens"
                            backButtonTintColor={Colors.VBSBlue}
                            headerBackTitle={'res'}
                            navigationBarStyle={{ borderBottomColor: 'transparent' }}
                            backButtonTextStyle={{ }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Router>
    );
};

export default RouterComponent;
