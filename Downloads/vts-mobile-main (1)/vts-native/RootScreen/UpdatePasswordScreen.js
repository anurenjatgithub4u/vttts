import React, { Fragment, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, ScrollView, BackHandler, Pressable, Modal, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import qs from 'qs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BlurView, } from "@react-native-community/blur";
import imagePath from '../constants/imagePath';
import { useHeader } from '../ApiHeader';

const UpdatePasswordScreen = () => {
  let location = useRoute();
  let Navigation = useNavigation();
  const { ApiPostUrl } = useHeader();
  const [loader, setLoader] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [passwordValidText, setPasswordValidText] = useState(false)
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [iconColor, setIconColor] = useState({ currentPassword: 'gray.500', newPassword: 'gray.500' })
  const [successModal, setSuccessModal] = useState(false);
  const [value, setValue] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const onChangeCurrentPassword = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, currentPassword: Text })
      setIconColor({ ...iconColor, currentPassword: '#000000' })
    } else {
      setValue({ ...value, currentPassword: Text })
      setIconColor({ ...iconColor, currentPassword: 'gray' })
    }
  }
  const onChangeNewPassword = (Text) => {
    if (Text.trim().length !== 0) {
      let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      if (Text.match(check)) {
        if (Text.trim().length > 10) {
          setButtonDisable(false)
          setPasswordValidText(false)
        }
      } else {
        setPasswordValidText(true)
        setButtonDisable(true)
      }

      setValue({ ...value, newPassword: Text })
      setIconColor({ ...iconColor, newPassword: '#000000' })
    } else {
      setValue({ ...value, newPassword: Text })
      setButtonDisable(true)
      setPasswordValidText(true)
      setIconColor({ ...iconColor, newPassword: '#000000' })
    }
  }

  useEffect(() => {
    const backAction = () => {
      Navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  var updatePassword = qs.stringify({
    token: location?.params?.passwordToken,
    password: value?.newPassword
  });

  const onSubmit = async () => {
    setLoader(true)
    await ApiPostUrl.post(`/password/update`, updatePassword)
      .then(function (ress) {
        if (ress?.status === 200) {
          setSuccessModal(true)
          setLoader(false)
          // setCustomModal({ ...customModal, modal: true, message: 'PASSWORD RESET SUCCESSFULLY !', status: 1 })
          setTimeout(() => { onRouteSuccess() }, 3500)
        }
      })
      .catch(function (errr) {
        console.log(errr)
        setLoader(false)
        setCustomModal({ ...customModal, modal: true, message: 'PASSWORD RESET FAILED !', status: 0 })
      })
  }

  const onRouteSuccess = () => {
    Navigation.navigate('LoginScreen')
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
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
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>CGVTS</Text>
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

      <Modal visible={loader} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <StatusBar barStyle='dark-content' backgroundColor="#ededfc" style={{ backgroundColor: '#ededfc' }} />
      <Animatable.View animation="slideInRight" style={{ flex: 1, backgroundColor: '#ededfc', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
        <Pressable onPress={() => Navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='arrow-back-circle' size={25} color={'#67748E'} />
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: '#67748E', lineHeight: 22 }}>Back</Text>
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 130, height: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
            <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
          </View>

          <View style={{ paddingTop: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
            <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
          </View>

          <View style={{ paddingTop: 70 }}>
            <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 16, color: '#7474f5', lineHeight: 22 }}>Enter new password</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252f40', lineHeight: 22 }}>Set the new password for your account</Text>
          </View>


          <View>
            <View style={{ paddingTop: 30 }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingBottom: 5 }}>New Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', height: 40, borderRadius: 5 }}>
                <Input
                  variant={'unstyled'}
                  placeholderTextColor={'#7D8EAB'}
                  value={value?.currentPassword}
                  onChangeText={(Text) => onChangeCurrentPassword(Text)}
                  type={passwordVisible ? 'text' : "password"}
                  borderWidth={0}
                  // InputLeftElement={<Icon as={<SimpleLineIcons name="lock" />} size={5} ml="2" color={iconColor.currentPassword} />}
                  // InputRightElement={<Icon as={<Pressable onPress={() => setPasswordVisible(passwordVisible => !passwordVisible)} style={{ alignItems: 'center', justifyContent: 'center', width: 35, }}><Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={20} /></Pressable>} size={5} mr="2" color="#000000" />}
                  style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }}
                  placeholder="Enter"
                />
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', paddingBottom: 5 }}>Confirm Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', height: 40, borderRadius: 5 }}>
                <Input
                  variant={'unstyled'}
                  placeholderTextColor={'#7D8EAB'}
                  value={value?.newPassword}
                  onChangeText={(Text) => onChangeNewPassword(Text)} type={passwordVisible ? 'text' : "password"}
                  borderWidth={0}
                  // InputLeftElement={<Icon as={<SimpleLineIcons name="lock" />} size={5} ml="2" color={iconColor.newPassword} />}
                  // InputRightElement={<Icon as={<Pressable onPress={() => setPasswordVisible(passwordVisible => !passwordVisible)} style={{ alignItems: 'center', justifyContent: 'center', width: 35, }}><Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={20} /></Pressable>} size={5} mr="2" color="#000000" />}
                  style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholder="Enter"
                />
              </View>
              {passwordValidText ?
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>uppercase,lowercase,special character and number</Text>
                : null}
            </View>
          </View>

          <TouchableOpacity disabled={buttonDisable} activeOpacity={buttonDisable ? 100 : 0.80} onPress={() => onSubmit()} style={{ width: '100%', marginTop: 50, backgroundColor: buttonDisable ? '#4646f273' : '#4646f2', width: '100%', borderRadius: 4, padding: 10, marginBottom: 10 }}>
            <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      <Modal visible={successModal} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <Animatable.View duration={800} animation={zoomOut} >
            <MaterialIcons name='verified' size={90} color={'green'} />
          </Animatable.View>
          <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 13, paddingTop: 20 }}>Password Update Successfully</Text>
        </View>
      </Modal>
    </Fragment>
  )
}

export default UpdatePasswordScreen

const zoomOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};