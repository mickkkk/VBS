import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RoosterScreen from '../screens/RoosterScreen';
import BerichtenScreen from '../screens/BerichtenScreen';
import MijnOpleidingScreen from '../screens/MijnOpleidingScreen';
import AccountScreen from '../screens/AccountScreen';
import ModuleScreen from '../components/MijnOpleiding/ModuleScreen';
import Chat from '../components/Berichten/Chat';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const RoosterStack = createStackNavigator({
  Rooster: RoosterScreen,
});

RoosterStack.navigationOptions = {
  tabBarLabel: 'Rooster',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-calendar`
          : 'md-information-circle'
      }
    />
  ),
};

const BerichtenStack = createStackNavigator({
  Berichten: BerichtenScreen,
  Chat: Chat,
});

BerichtenStack.navigationOptions = {
  tabBarLabel: 'Berichten',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      focused={focused}
      size={30}
      name={Platform.OS === 'ios' ? `chat-bubble${focused ? '-outline' : '-outline'}` : 'md-link'}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const MijnOpleidingStack = createStackNavigator({
  MijnOpleiding: MijnOpleidingScreen,
  Module:ModuleScreen,
  }
);

MijnOpleidingStack.navigationOptions = {
  tabBarLabel: 'Mijn Opleiding',
  tabBarIcon: ({ focused }) => (
    focused ? 
    <Image 
      focused={focused}
      style={{
        height: 30,
        width: 25
      }} 
      source={require('../assets/images/vbs.png')}/>
      :
      <Image 
      focused={focused}
      style={{
        height: 30,
        width: 25
      }} 
      source={require('../assets/images/vbs_unfocused.png')}/>
    
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    // />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    
    <MaterialCommunityIcons
       focused={focused}
       size={35}
       name={Platform.OS === 'ios' ? `account${focused ? '-outline' : '-outline'}` : 'md-link'}
       color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

export default createBottomTabNavigator({
  RoosterStack,
  BerichtenStack,
  MijnOpleidingStack,
  AccountStack,
});
