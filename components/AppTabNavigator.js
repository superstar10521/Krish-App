import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import VideoUploadScreen from '../screens/VideoUploadScreen';
import MainScreen from '../screens/MainScreen'


export const AppTabNavigator = createBottomTabNavigator({
  MainScreen : {
    screen: MainScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Main Screen",
    }
  },
  VideoUploadScreen: {
    screen: VideoUploadScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Upload",
    }
  }
});
