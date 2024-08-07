import React, { Fragment, useEffect } from 'react'
import { Text, View, BackHandler, UIManager, Platform, ActivityIndicator, Modal, Pressable, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from 'react';
import qs from 'qs';
import { Input } from 'native-base';
import { BlurView, } from "@react-native-community/blur";
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const UpdatePassword = ({ expandPassword, value, setValue, updatePassword }) => {
  const { ApiRequestPasswordUpdate } = useHeader();
  const [loading, setLoading] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })

  const [passwordValid, setPasswordValid] = useState(true)
  const [newPasswordValid, setNewPasswordValid] = useState(false)
  const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState(true)
  const [samePassword, setSamePassword] = useState(false);

  const onChangePassword = (Text) => {
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (Text.trim().length !== 0) {
      setValue({ ...value, Password: Text })
      setPasswordValid(false)
    } else {
      setValue({ ...value, Password: Text })
      setPasswordValid(true)
    }
  }
  const onChangeNewPassword = (Text) => {
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,15})/;
    if (Text.match(check)) {
      setValue({ ...value, NewPassword: Text })
      setNewPasswordValid(false)
    } else {
      setValue({ ...value, NewPassword: Text })
      setNewPasswordValid(true)
    }
  }
  const onChangeConfirmNewPassword = (Text) => {
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (Text.trim().length !== 0) {
      setValue({ ...value, ConfirmNewPassword: Text })
      setConfirmNewPasswordValid(false)
    } else {
      setValue({ ...value, ConfirmNewPassword: Text })
      setConfirmNewPasswordValid(true)
    }
  }

  useEffect(() => {
    if (value?.ConfirmNewPassword === value?.NewPassword) {
      setSamePassword(false)
    } else {
      if (value?.ConfirmNewPassword !== '') {
        setSamePassword(true)
      }
    }
  }, [value?.ConfirmNewPassword, value?.NewPassword])

  const passwordData = qs.stringify({
    currentPassword: value?.Password,
    newPassword: value?.ConfirmNewPassword
  })
  const onPasswordUpdate = async () => {
    setLoading(true)
    await ApiRequestPasswordUpdate.post(`/password`, passwordData)
      .then(function (ress) {
        if (ress.status === 200) {
          setLoading(false)
          setCustomModal({ ...customModal, modal: true, message: 'Password Update Successfully !', status: 1 })
        }
      })
      .catch(function (err) {
        console.log('Password Update', err)
        setLoading(false)
        setCustomModal({ ...customModal, modal: true, message: 'Password Update Failed !', status: 0 })
      })
  }

  const onRouteSuccess = async () => {
    setLoading(true)
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
    await AsyncStorage.clear();

    setTimeout(() => {
      BackHandler.exitApp();
      setLoading(false)
    }, 2000)
  }
  const onRouteFailed = () => {
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            {customModal?.status === 1 ?
              <Pressable onPress={() => onRouteSuccess()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
                <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
              </Pressable>
              :
              <Pressable onPress={() => onRouteFailed()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
                <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
              </Pressable>
            }
          </View>
        </View>
      </Modal>

      <Modal visible={loading} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <Pressable onPress={() => expandPassword()} style={{ marginTop: 2, width: '100%', backgroundColor: '#EBEBFD', padding: 5, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Semibold', fontSize: 14 }}>Change password</Text>
          <View style={{ flexGrow: 1 }} />
          <Entypo name={updatePassword ? 'chevron-small-up' : 'chevron-small-down'} size={30} color={'#D0D0FB'} />
        </View>
      </Pressable>
      {updatePassword ?
        <View style={{ backgroundColor: '#ffffff', width: '100%', paddingHorizontal: 20, paddingBottom: 20, marginTop: 5, marginBottom: 5, borderRadius: 5 }}>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>Old Password</Text>
            <Input value={value?.Password} onChangeText={(Text) => onChangePassword(Text)} type={'password'} variant={'unstyled'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
            {/* {passwordValid ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>minimum 10 with uppercase,lowercase,special character and number</Text>
              </View>
              : null
            } */}
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>New Password</Text>
            <Input value={value?.NewPassword} onChangeText={(Text) => onChangeNewPassword(Text)} type={'password'} variant={'unstyled'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
            {newPasswordValid ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>minimum 10 with uppercase,lowercase,special character and number</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>Confirm Password</Text>
            <Input value={value?.ConfirmNewPassword} onChangeText={(Text) => onChangeConfirmNewPassword(Text)} type={'password'} variant={'unstyled'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
            {/* {confirmNewPasswordValid ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>minimum 10 with uppercase,lowercase,special character and number</Text>
              </View>
              : null
            } */}
            {samePassword ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Passwords do not match</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 15 }}>
            {value?.Password === '' || value?.NewPassword === '' || value?.ConfirmNewPassword === '' || samePassword === true || passwordValid === true || newPasswordValid === true || confirmNewPasswordValid === true ?
              < Pressable style={{ backgroundColor: '#7272F2', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </Pressable>
              :
              <Pressable onPress={onPasswordUpdate} style={{ backgroundColor: '#4444DE', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </Pressable>
            }
          </View>
        </View>
        : null}
    </Fragment>
  )
}

export default UpdatePassword