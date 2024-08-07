import React, { Fragment } from 'react';
import { Image, StatusBar, Pressable, View, } from 'react-native';
import { Text, Center, } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import imagePath from '../constants/imagePath';

const UserTypeScreen = () => {
  let Navigation = useNavigation();
  return (
    <Fragment>
      <Pressable onPress={() => Navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name='arrow-back-circle' size={25} color={'#67748E'} />
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: '#67748E', lineHeight: 22 }}>Back</Text>
      </Pressable>
      <StatusBar barStyle='dark-content' backgroundColor="#ededfc" style={{ backgroundColor: '#ededfc' }} />
      <View style={{ flex: 1, backgroundColor: '#ededfc', /* justifyContent: 'center', alignItems: 'center' */ }}>
        <View style={{ alignItems: "center", paddingTop: 70 }}>
          <Center style={{ width: 130, height: 130, backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
            <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
          </Center>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
            <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>Select User Type</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
          <Pressable onPress={() => Navigation.navigate('CitizensRegisterScreen')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 120, height: 120, borderRadius: 70, backgroundColor: '#8b8be0' }}>
              <Image source={imagePath?.Group_21076} style={{ width: 120, height: 120, marginTop: 9, marginLeft: 1 }} resizeMode='contain' />
            </View>
            <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#252F40', paddingTop: 20 }}>Citizens</Text>
          </Pressable>
          <View style={{ marginLeft: 20, marginRight: 20 }} />
          <Pressable onPress={() => Navigation.navigate('NewRegisterScreen')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 120, height: 120, borderRadius: 70, backgroundColor: '#8b8be0' }}>
              <Image source={imagePath?.Group_21077} style={{ width: 120, height: 120, }} resizeMode='contain' />
            </View>
            <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#252F40', paddingTop: 20 }}>Officials</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Already have an account ? </Text>
        <Pressable onPress={() => Navigation.navigate('LoginScreen')}>
          <Text style={{ color: '#4646F2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Login</Text>
        </Pressable>
      </Pressable>
    </Fragment>
  )
}

export default UserTypeScreen