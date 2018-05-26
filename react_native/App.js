'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

import SplashScreen from './splash_screen';
import DrawerNavigation from './drawer_navigation';

const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  drawerStack: { screen: DrawerNavigation },
}, {
  initialRouteName: "Splash",
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default AppNavigator;
AppRegistry.registerComponent('ReactApplication', () => AppNavigator);
