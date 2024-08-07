import React, { Fragment, useState, useContext } from 'react';
import { View, StatusBar, Modal, LayoutAnimation, UIManager, Platform, ActivityIndicator, Button, ScrollView, BackHandler, Text, TouchableOpacity, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useHeader } from '../ApiHeader';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Account from '../../CitizensComponent/CitizensAccountScreen/Account';
import { Center } from 'native-base';
import { BlurView, } from "@react-native-community/blur";
import { AuthContext } from '../../Context/context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LogoutFunction = () => {
  const [signOutModal, setSignOutModal] = useState(false)
  const [signOutLoader, setSignOutLoader] = useState(false)

  const { toggleRoute } = useContext(AuthContext);

  const onLogOut = () => {
    setSignOutLoader(true)
    AsyncStorage.clear()
      .then(function () {
        // BackHandler.exitApp();
        toggleRoute();
      });
  };

  return (
    <Fragment>
      <Modal visible={signOutModal} transparent={true} onRequestClose={() => setSignOutModal(!signOutModal)}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <Pressable onPress={() => setSignOutModal(!signOutModal)} style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
          <Animatable.View animation={signOutModal ? "fadeInUp" : "fadeInDown"} duration={300}>
            <View style={{ width: '100%', backgroundColor: '#F5F9FF', borderRadius: 15, elevation: 12, padding: 20 }}>
              <View style={{ width: 45, height: 45, backgroundColor: '#D0D0FB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='warning-outline' color={'#FA9826'} size={26} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 14, }}>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>Log Out from{" "}</Text>
                <Text style={{ color: '#3A4CF7', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>CGVTS</Text>
              </View>
              <Text style={{ paddingTop: 10, color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }} >Are you sure you want to Log Out?</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 50, }}>
                <TouchableOpacity onPress={() => onLogOut()} activeOpacity={0.80} style={{ backgroundColor: '#4646F2', width: '65%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderStyle: 'solid', borderColor: '#4646F2', margin: 1 }}>
                  <Text style={{ color: '#F5F5FC', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Yes, Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSignOutModal(!signOutModal)} activeOpacity={0.80} style={{ width: '35%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderStyle: 'solid', borderColor: '#4646F2', margin: 1 }}>
                  <Text style={{ color: '#4646F2', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </Pressable>
      </Modal>

      <Modal visible={signOutLoader} transparent={true} onRequestClose={() => setSignOutModal(!signOutModal)}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'#000000ad'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <Pressable onPress={() => setSignOutModal(!signOutModal)} style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
          <View style={{ /* flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F9FF', borderRadius: 5, elevation: 12, padding: 20 */ }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
            {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingLeft: 10 }}>Loading state</Text> */}
          </View>
        </Pressable>
      </Modal>
      <View style={{ width: '100%', position: 'absolute', bottom: 0, paddingHorizontal: 15, paddingBottom: 5 }}>
        <TouchableOpacity onPress={() => setSignOutModal(!signOutModal)} activeOpacity={0.80} style={{ backgroundColor: '#4646F2', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
          <Text style={{ color: '#F5F5FC', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

export default LogoutFunction