import React from 'react';
import { useEffect } from 'react';
import { View, StatusBar, Image, Text } from 'react-native';
import { Center } from 'native-base';
import imagePath from '../constants/imagePath';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoadingScreen')
    }, 3000)
  }, []);

  return (
    <View style={{ backgroundColor: '#ebebfd', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ebebfd" />
      <Center style={{ width: '100%', }}>
        <Image source={imagePath.vtsLogo} style={{ width: '70%', height: '70%' }} resizeMode='contain' />
      </Center>
      <Text style={{ color: '#3A4CF7', fontFamily: 'OpenSans-Bold', fontSize: 35, textAlign: 'center' }}>Vehicle Tracking System</Text>
    </View>
  )
}

export default SplashScreen