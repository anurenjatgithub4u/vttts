import React, { Fragment, useState, useContext } from 'react';
import { View, StatusBar, Modal, LayoutAnimation, UIManager, Platform, ActivityIndicator, Button, ScrollView, BackHandler, Text, TouchableOpacity, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useHeader } from '../ApiHeader';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Account from '../MainComponent/AccountScreenComponent/Account'
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import BlurViewScreen from '../BlurViewScreen';
import { AuthContext } from '../Context/context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const AccountScreen = ({ navigation }) => {
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [signOutModal, setSignOutModal] = useState(false)
  const [signOutLoader, setSignOutLoader] = useState(false)
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
    isPublic: false
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
            Phone: res.data?.phone, // res.data?.phone?.slice(2),
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

  const { toggleRoute } = useContext(AuthContext);

  const onLogOut = () => {
    setSignOutLoader(true)
    AsyncStorage.clear()
      .then(function () {
        setTimeout(() => {
          // BackHandler.exitApp();
          toggleRoute();
        }, 2000)
      })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProfile();
      setUpdatePersonal(false);
      setUpdateContact(false);
      setUpdatePassword(false);
      setValue({ ...value, Password: '', NewPassword: '', ConfirmNewPassword: '' })
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Fragment>
      <Modal visible={loader} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <Modal visible={signOutModal} transparent={true} onRequestClose={() => setSignOutModal(!signOutModal)}>
        <BlurViewScreen />
        <Pressable onPress={() => setSignOutModal(!signOutModal)} style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
          <Animatable.View animation={signOutModal ? "fadeInUp" : "fadeInDown"} duration={300}>
            <View style={{ width: '100%', backgroundColor: '#F5F9FF', borderRadius: 15, elevation: 12, padding: 20 }}>
              <View style={{ width: 45, height: 45, backgroundColor: '#D0D0FB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='warning-outline' color={'#FA9826'} size={26} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 14, }}>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>Log Out from{" "}</Text>
                <Text style={{ color: '#3A4CF7', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>CGVTS</Text>
              </View>
              <Text style={{ paddingTop: 10, color: '#67748E', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }} >Are you sure you want to log out?</Text>
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
        <BlurViewScreen />
        <Pressable onPress={() => setSignOutModal(!signOutModal)} style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
          <View style={{}}>
            <ActivityIndicator color={'#63CE78'} size={'small'} />
          </View>
        </Pressable>
      </Modal>

      <View style={{ flex: 1, backgroundColor: '#F4F4FE', }}>
        <FocusAwareStatusBar barStyle='dark-content' backgroundColor="#F4F4FE" />

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
          <View style={{ width: '100%', position: 'absolute', bottom: 0, paddingHorizontal: 15, paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => setSignOutModal(!signOutModal)} activeOpacity={0.80} style={{ backgroundColor: '#4646F2', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
              <Text style={{ color: '#F5F5FC', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Log out</Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    </Fragment>
  )
}

export default AccountScreen