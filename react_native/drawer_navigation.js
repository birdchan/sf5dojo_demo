'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  Button,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

import CharListScreen from './char_list_screen';
import SideBar from './side_bar_screen';


const DrawerStack = DrawerNavigator(
  {
    CharList: { screen: CharListScreen },
  },
  {
    drawerWidth: 270,
    initialRouteName: "CharList",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  navigationOptions: ({navigation}) => {
    return {
      title: 'SFV Dojo',
      headerStyle: {
        backgroundColor: '#ff0000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
      },
      headerLeft: <View style={{paddingLeft:16}}>
        <TouchableHighlight
          onPress={() => navigation.navigate('DrawerToggle')}>
          <Text
            style={{color: '#fff'}}
          >
            Menu
          </Text>
        </TouchableHighlight>
      </View>,
      headerRight: (<View />),
    };
  }
})

export default DrawerNavigation;
