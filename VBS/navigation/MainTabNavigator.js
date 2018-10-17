import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RoosterScreen from '../screens/RoosterScreen';
import BerichtenScreen from '../screens/BerichtenScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { MaterialIcons } from '@expo/vector-icons';

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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  RoosterStack,
  BerichtenStack,
  SettingsStack,
});
