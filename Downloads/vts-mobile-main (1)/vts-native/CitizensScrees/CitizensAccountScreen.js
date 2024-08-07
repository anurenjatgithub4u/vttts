import React, { Fragment, useState } from 'react';
import { View, StatusBar, Modal, LayoutAnimation, UIManager, Platform, ActivityIndicator, Button, ScrollView, BackHandler, Text, TouchableOpacity, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useHeader } from '../ApiHeader';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Account from '../CitizensComponent/CitizensAccountScreen/Account';
import { Center } from 'native-base';
import { BlurView, } from "@react-native-community/blur";

import LogoutFunction from './Helper/LogoutFunction'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensAccountScreen = () => {
  let location = useRoute();
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [updatePersonal, setUpdatePersonal] = useState(false);
  const [updateContact, setUpdateContact] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const [getProfileData, setGetProfileData] = useState({});
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    id: '',
    FirstName: '',
    LastName: '',
    Emial: '',
    Phone: '',
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: '',


    attributes: {},
    login: '',
    readonly: '',
    administrator: '',
    map: '',
    latitude: '',
    longitude: '',
    zoom: '',
    twelveHourFormat: '',
    coordinateFormat: '',
    disabled: '',
    expirationTime: '',
    deviceLimit: '',
    userLimit: '',
    deviceReadonly: '',
    token: '',
    limitCommands: '',
    poiLayer: '',
    disableReports: '',
    roleid: '',
    createdon: '',
    lastUpdate: '',
    isRegRequest: '',
    isPublic: true
  })

  const GetProfile = async () => {
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/users/${location?.params?.userId}`)
      .then(function (res) {
        if (res.status === 200) {
          setGetProfileData(res.data)
          setValue({
            ...value,
            id: res.data?.id,
            FirstName: res.data?.name?.split(" ")[0] === undefined ? '' : res.data?.name?.split(" ")[0],
            LastName: res.data?.name?.split(" ")[1] === undefined ? '' : res.data?.name?.split(" ")[1],
            Emial: res.data?.email,
            Phone: res.data?.phone?.slice(2),
            Password: res.data?.password,

            attributes: res.data?.attributes,
            login: res.data?.login,
            readonly: res.data?.readonly,
            administrator: res.data?.administrator,
            map: res.data?.map,
            latitude: res.data?.latitude,
            longitude: res.data?.longitude,
            zoom: res.data?.zoom,
            twelveHourFormat: res.data?.twelveHourFormat,
            coordinateFormat: res.data?.coordinateFormat,
            disabled: res.data?.disabled,
            expirationTime: res.data?.expirationTime,
            deviceLimit: res.data?.deviceLimit,
            userLimit: res.data?.userLimit,
            deviceReadonly: res.data?.deviceReadonly,
            token: res.data?.token,
            limitCommands: res.data?.limitCommands,
            poiLayer: res.data?.poiLayer,
            disableReports: res.data?.disableReports,
            roleid: res.data?.roleid,
            createdon: res.data?.createdon,
            lastUpdate: res.data?.lastUpdate,
            isRegRequest: res.data?.isRegRequest,
            isPublic: res.data?.isPublic,
          })
          setLoader(false)
        } else {

        }
      })
      .catch(function (err) {
        console.log(err)
        setLoader(true)
      })
      .finally(function () {
        setLoader(false)
      })
  }
  useEffect(() => {
    GetProfile();
  }, []);

  const expandPersonal = () => {
    LayoutAnimation.easeInEaseOut();
    setUpdatePersonal(updatePersonal => !updatePersonal)
    setUpdateContact(false)
    setUpdatePassword(false)
  }
  const expandContact = () => {
    LayoutAnimation.easeInEaseOut();
    setUpdateContact(updateContact => !updateContact)
    setUpdatePersonal(false)
    setUpdatePassword(false)
  }
  const expandPassword = () => {
    LayoutAnimation.easeInEaseOut();
    setUpdatePassword(updatePassword => !updatePassword)
    setUpdateContact(false)
    setUpdatePersonal(false)
  }


  return (
    <Fragment>
      <Modal visible={loader} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>



      <View style={{ flex: 1, backgroundColor: '#F4F4FE', }}>
        <FocusAwareStatusBar barStyle='dark-content' backgroundColor="#F4F4FE" />
        <View style={{ position: 'absolute', left: 20, top: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', zIndex: 9999 }}>
          <Pressable onPress={() => Navigation.goBack()}>
            <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
              <Ionicons name='chevron-back-sharp' color={'#FFFFFF'} size={28} />
            </Center>
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Account
            expandPassword={expandPassword}
            expandContact={expandContact}
            expandPersonal={expandPersonal}
            value={value}
            setValue={setValue}
            getProfileData={getProfileData}
            updatePersonal={updatePersonal}
            updateContact={updateContact}
            updatePassword={updatePassword}
            GetProfile={GetProfile}
          />
        </ScrollView>

        {updatePersonal === true || updateContact === true || updatePassword === true ?
          null
          :
          <LogoutFunction />
        }

      </View>
    </Fragment>
  )
}

export default CitizensAccountScreen